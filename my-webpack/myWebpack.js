const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAns = (filename) => {
  const content = fs.readFileSync(filename,'utf-8');
  const ast = parser.parse(content,{
      'sourceType' : 'module'
  })
  let dependencies = {}
  traverse(ast,{
      ImportDeclaration({node}){
        console.log(node)
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

const code = moduleAns('./src/index.js')
console.log(code)
