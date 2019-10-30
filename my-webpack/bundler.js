const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

//1.模块分析
const moduleAns = (filename) => {
    const content = fs.readFileSync(filename,'utf-8');
    const ast = parser.parse(content,{
        'sourceType' : 'module'
    })
    let dependencies = {}
    traverse(ast,{
        ImportDeclaration({node}){
            const dirname = path.dirname(filename);
            const newSrc = path.join( dirname , node.source.value );
            const newFile = './'+newSrc.replace(/\\/g,'/');
            dependencies[node.source.value] = newFile
        }
    })
    const {code} = babel.transformFromAst(ast,null,{
        presets : ['@babel/preset-env']
    })
    return {
        filename,
        dependencies,
        code
    }
}
//2.依赖图谱
const dependenciesGraph = (entry) => {
    const entryModule = moduleAns(entry);
    let graphArray = [entryModule];
    for( let i=0;i<graphArray.length;i++ ){
        const dependencies = graphArray[i].dependencies;
        if( dependencies ){
            for( let attr in dependencies ){
                graphArray.push(moduleAns(dependencies[attr]))
            }
        }
    }
    let graph = {}
    graphArray.forEach(item=>{
        graph[item.filename] = {
            dependencies : item.dependencies,
            code : item.code
        }
    })
    return graph
}
//生成代码

const createCode = (entry) => {
    const graph = JSON.stringify(dependenciesGraph(entry));
    return `
        (function(graph){
            function require(module){
                function localPath(relativePath){
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(localPath,exports,graph[module].code);
                return exports;
            }
            require('${entry}')
        })(${graph})
    `
}
const code = createCode( './src/index.js' )
console.log( code )