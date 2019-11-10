# Docker 安装Jenkins，搭建Vue自动构化部署任务，安装自己的代码仓库gitea

## Doker安装

1. 卸载之前可能已经安装的docker，可以执行一下命令，如果没有安装过可以忽略：

    ```shell
    apt-get remove docker docker-engine docker.io
    ```

2. 安装必要的软件包以允许apt通过HTTPS使用存储库，具体如下：

    ```shell
    sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
    ```

3. 添加GPG密钥，可以添加官方的和阿里的，一般官方的对于国内用户来说会慢一些，所以建议使用阿里的：

    ```shell
    // 阿里
    curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

    // 官方
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    ```

    添加成功之后命令行输出：OK  
    也可以使用 sudo apt-key fingerprint 0EBFCD88 验证是否安装成功，正常的话会输出一下内容：

    ```shell
    pub   rsa4096 2017-02-22 [SCEA]
        9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
    uid           [ 未知 ] Docker Release (CE deb) <docker@docker.com>
    sub   rsa4096 2017-02-22 [S]
```

4. 设定稳定仓储库  

    也可以不设置，不设置默认使用官方的，具体是：deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable  
    同样可以用阿里 的镜像：设置命令如下：  

    ```shell
    sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
    ```

    其中的lsb_release -cs相当于一个函数，直接获取Ubuntu下的最新版本

    当设置好之后，执行 sudo apt-get update 以更新ubuntu安装列表

5. 开始正式安装Docker

    ```shell
    sudo apt-get -y install docker-ce # docker-ce
    ```

    也可安装指定版本的docker，在安装之前查看一下都有哪些版本可用：

    ```shell
    apt-cache madison docker-ce

    # 输出内容如下：
    docker-ce | 5:18.09.0~3-0~ubuntu-bionic | http://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
    docker-ce | 18.06.1~ce~3-0~ubuntu | http://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
    docker-ce | 18.06.0~ce~3-0~ubuntu | http://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
    docker-ce | 18.03.1~ce~3-0~ubuntu | http://mirrors.aliyun.com/docker-ce/linux/ubuntu bionic/stable amd64 Packages
    ```

    选择具体的版本之后执行以下脚本暗转:

    ```shell
    sudo apt-get install -y docker-ce=<VERSION>
```

6. docker常用命令

    通过以上的安装，我们已经有了自己docker，接下来就可以启动docker，创建镜像之类的了，在进行Jenkins安装之前，先熟悉一下docker的命令

    ```shell
        # 查询镜像
        docker search [name]
        # 安装镜像
        docker pull [name]
        # 导入镜像
        docker load < /home/node.tar.gz
        # 到处镜像
        docker save > /home/node.tar.gz
        # 查看所有已安装镜像
        docker images
        # 删除镜像
        docker rmi [name]
        # 修改镜像名称
        docker tag docker.io/node node

        # 启动镜像

        # 启动实例并进入交互环境
        docker run -it --name <docker实例名称> <docker镜像名称> bash 
        # 启动实例并在后台运行
        docker run -d --name <docker实例名称> <docker镜像名称>
        # 端口映射
        docker run -it --name <docker实例名称> -p 9000:8085 -p 9000:8086 <docker镜像名称> bash
        # 目录映射
        docker run -it --name <docker实例名称> -v /home/project:/soft --privileged docker.io/node bash
        # 进入实例交互环境
        docker exec -it <docker实例名称> bash
        # 自动重启
        docker  run --restart=always -it --name <docker实例名称> -p 9000:8085 -p 9000:8086 <docker镜像名称> bash
        # 暂停容器
        docker pause node
        # 开启暂停的容器
        docker unpause node
        # 停止容器
        docker stop node 
        # 启动容器
        docker start -i node
        # 查看容器
        docker ps -a
    ```

## 基于 docker 安装 jenkins

1. 安装jenkins镜像

    ```shell
    docker pull jenkins/jenkins:lts
    ```

    查看已经安装的jenkins镜像 docker images，会看到类似于一下的内容：

    ```shell
        jenkins/jenkins     lts                 fac78e370c0b        12 days ago         568MB
    ``` 

2. 创建docker镜像实例的本地映射地址 

```shell
mkdir /var/jenkins_node
```

3. 启动实例

```shell
docker run --name jenkins_node -d -v /var/jenkins_node:/var/jenkins_home -p 8081:8080 -p 50000:50000 jenkins/jenkins:lts
```
- --name: --name jenkins_node 表示实例名称为 <jenkins_node>
- -d 表示在后台运行
- -v: -v /var/jenkins_node:/var/jenkins_home 表示将实例下的/var/jenkins_home目录映射到本地的/var/jenkins_node目录下
- -p: -p 8081:8080 将默认端口8080更改为8081
- -p: 这是第二个p，全称是--privileged，表示赋予最高权限
- jenkins/jenkins:lts： 表示使用最新的jenkins镜像

整行命令的意义：运行一个镜像为jenkins:latest的容器，命名为jenkins_node，赋予最高权限，将容器的/var/jenkins_home映射到宿主机的/var/jenkins_node目录下，映射容器中8080端口到宿主机8081端口

4. 网页查看并运行安装配置

    打开 http://localhost:8081，或者使用服务器公网IP，看到一下页面：

    ![jenkins安装后首页](./jenkins/jenkins_home_pic.png)  

    然后进入容器内容：

    ```shell
    docker exec -it jenkins /bin/bash
    ```

    查看相应后台管理默认密码：
    
    ```shell
    cat /var/jenkins_home/secrets/initialAdminPassword
    ```

    将得到的密码粘贴到管理员密码输入框中，点击继续。  
    看到如下页面，选择【安装推荐的插件】  

    ![安装推荐的插件](./jenkins/jenkins_plugins_select.png) 

    之后跳到插件安装进程的页面，插件安装需要等一段时间，这个时候就耐心等待就好了。  
    插件安装成功之后，跳到创建管理员页面，可以创建，也可以继续使用之前，复制的那个超长的密码，个人建议创建一个新管理员用户。 

    ![创建新的管理员](./jenkins/jenkins_admin_create.png) 

    继续下一步，跳到实例配置页面

    ![实例配置页面](./jenkins/jenkins_example.png)

    一切准备就绪，我们可以进到jenkins的正式页面了  
    
    ![jenkins欢迎页面](./jenkins/jenkins_weclome.png)

## Jenkins 配置 Vue 自动化

    当jenkins正常运行之后，就可以开始配置vue的构建和部署环境了  

### 安装ssh插件

1. 点击系统管理 -> 插件管理(Manage Plugins) -> 搜索Publish Over SSH,并安装

    ![系统配置](./jenkins/jenkins_vue_1.png)

    ![插件管理](./jenkins/jenkins_vue_2.png)

2. 配置ssh

    系统管理 -> 系统设置[configure system] -> 拉到最下面

    ![插件管理](./jenkins/jenkins_ssh_setting.png)

    配置好之后，点击右下方的 [Test Configuration]，测试是否成功。这里指定构建好之后的vue项目发送到远程服务器的地址，当然需要在创建任务时进行相应的脚本配置

### 安装 node 插件

1.  点击系统管理 -> 插件管理(Manage Plugins) -> Nodejs,并安装

    ![插件管理](./jenkins/jenkins_node_plugin.png)

2. 配置node

    系统管理 -> 全局工具配置 -> Nodejs

    配置node名称和选择node版本  

    ![配置node](./jenkins/jenkins_node.png)


### Vue项目创建

使用vue-cli直接创建一个项目，或者自己动手搭建也可以，我这里是自己搭建的，并且推到了GitHub上了，地址为;https://github.com/yxcs/vue-test.git  

接下来就可以使用这个地址进行配置了

### Vue任务创建

![创建任务](./jenkins/jenkins_create_vue_task.png)

![选择创建类型](./jenkins/jenkins_vue_task_select.png)

![设置github地址](./jenkins/jenkins_vue_github.png)

![设置node](./jenkins/jenkins_vue_node.png)

![设置jenkins的运行脚本，打包](./jenkins/jenkisn_vue_shell.png)

![打包后在远程服务器进行目录构建](./jenkins/jenkins_vue_build_tar.png)

### 执行构建

![执行构建](./jenkins/jenkins_building.png)

这时就可以在远程服务器看到对应的打包之后解压出来的文件了，在配置相应的nginx，就可以运行vue构建的网站了

## Gitea代码仓库搭建

使用docker安装gitea镜像

```shell
docker pull gitea/gitea:latest
```

创建本地映射文件目录

```shell
sudo mkdir -p /var/lib/gitea
```

构建运行镜像实例

```shell
docker run -d --name=gitea -p 10022:22 -p 3000:3000 -v /var/lib/gitea:/data gitea/gitea:latest
```

打开gitea网站进行配置，打开http://localhost:3000，点击注册或者登录，进行配置

![gitea登录](./jenkins/jenkins_gitea_login.png)

第 1 步：选择 MySQL 数据库  
第 2 步：填入 MySQL 数据库容器的名称（container_name）  
第 3 步：填入数据库用户密码（此处设置密码为：gitea，您可以根据自己需要设置）  

![gitea配置](./jenkins/jenkins_gitea_setting.webp)

第 4 步：填入宿主机的域名或IP地址  
第 5 步：填入Gitea网站的访问地址和端口  

![gitea ssh 配置](./jenkins/jenkins_gitea_ssh.webp)

第 6 步：配置管理员账号

![配置管理员账号](./jenkins/jenkis_gitea_account.webp)

之后创建仓库，并且向仓库里推送代码

![创建仓库](./jenkins/jenkins_gitea_create_code.png)

![代码推送](./jenkins/jenkins_gitea_code_push.png)

## 线上体验地址

Jenkins：[http://47.104.141.127:8081/](http://47.104.141.127:8081/)  

Gitea：[http://47.104.141.127:8081/](http://47.104.141.127:3000/)

备案还没完成，没法使用域名  

GitHub有时访问会很慢，Gitlab又歧视中国工程师，所以选择了Gitea
