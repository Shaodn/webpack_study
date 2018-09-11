1.什么是webpack？
webpack，模块打包机，可以分析项目结构，找到JavaScript模块，以及其他浏览器不能运行的扩展语言，例如：（less）并将其转换和打包为合适的格式供浏览器使用

2.为什么使用webpack
把js,css,img等（模块）打包；减少请求

3.安装webpack
通过npm下载
第一步，要想使用npm下载，必须要有package.json文件，
所以，先 npm init 逐步配置好文件
第二步 安装webpack
=======》全局安装（不推荐=》因为=》框架更新太快）i（install） -g等同于（--global）
命令：npm i -g webpack@（版本号）
=======》局部安装（推荐）--save-dev 开发的模式去使用
命令：npm i --save-dev @3.5.6 (学的3.5.6，已更新到4.xx)

4.打包
用终端命令实现webpack 打包（webpack模块）（入口）（出口）
node_moudles\.bin\webpack app\main.js public\build_main.js
(node_moudles\.bin\webpack：具有打包功能的webpack的路径 app\main.js：要打包的入口文件 public\build_main.js：生成的出口文件)
文件结构：在根目录下创建app和public两个文件夹，在app文件夹中建立两个js文件，一个filter_title.js，一个main .js 在main.js里面用require引用filter_title.js文件，在public文件夹中建立一个index.html文件，script引入在上文出口定义的文件名，然后打包。
打包命令：node_moudles\.bin\webpack app\main.js public\build_main.js
打包之后，public文件夹中会自动生成你定义的出口文件的名字（注意：在打包失败的情况下，public文件夹中可能会生成两个build_main.js，需手动删除，重新打包）
上述的打包方式命令过长，不好管理，webpack提供了一个配置文件，名字叫做webpack.config.js（固定，不可变，webpack会自动搜寻这个文件）
在webpack.config.js 中进行如下配置：
module.exports = {
    devtool:'eval-source-map',
  // 唯一的入口文件
    entry:__dirname + '/app/main.js',
    // 打包之后的文件该输出到哪个位置
    output:{
      path:__dirname + '/public',
      filename: 'build_main.js'
    },
    // devServer 2.9.5 启动自带热更新
    // 并且它会监测所依赖的模块是否修改
    // 我们update code=> 状态触发 => 重新打包 => 触发刷新
    devServer: {
        // 本地服务器所加载的页面所在的目录
        contentBase:'./public',
        // 服务器端口 => 默认端口 8080
        port:'8888'
    }
}
配置之后打包命令：node_modules\.bin\webpack
虽然简化了，但是还是很长，于是，可以在package.json文件里面的script这个对象进行一个自定义指令的设置简化命令打包，在script里面设置：“start”：“webpack”
输入命令：npm start 可以直接打包。
webpack提供了一些指令，直接npm即可运行，若想自定义，必须加run，即把start换成自定义的如：sdn,输入命令时，命令为：npm run sdn 即可打包。

5.调试简单化
在上述生成的build_main.js文件会有很多加入的代码，可以起到混淆的作用，但这样对自己本身的调试也带来了不便，为了方便调试，在webpack.config.js 文件中配置 source maps 可以看到依赖的代码，在调试时，可以打断点，配置方式为，在webpack.config.js中配置：devtool:'eval-source-map'即可（注意：此配置项仅在调试时使用）
使用eval 打包源文件模块，在同一个文件中
生成一个干净完整source map。这个文件可以在不影响构建速度的前提下生成完整的sourcemap
但对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段一定不要启用这个选项。

6.代码热更新
代码热更新=》创建自己的开发测试服务器
webpack提供一个本地开发服务器，这个服务器是基于node.js
这个模块需要下载 并且依赖一下
命令：cnpm i --save-dev webpack-dev-server@2.9.5(webpack-dev-server => 3.0以上版本是为webpack4.0服务的,我们用2.9.5版本)
在package.json文件中的script中加入"server": "webpack-dev-server --open"
代码热更新命令：npm run server
运行后，自动跳转到端口号为8888（自己设的）运行，运行后，修改代码时，不用刷新，浏览器上面的会自动更新。

7.webpack有一个强大的功能 --loaders=====》通过使用不同的loader，webpack有能力调用外部的工具和模块，实现对不同文件的处理，比如说把es6=>es5;转化成现代浏览器兼容的js文件
=====》因为babel 一直就是在做这个兼容性转义的，所以用babel（网址：https://www.babeljs.cn/）
========>下载babel的处理模块包
babel的安装和配置
    babel的三个核心模块
	babel-loader ===> 让webpack知道babel如何运行
	babel-core ===> 让babel知道如何解析代码
	babel-preset-env ===> 可以根据不同的环境转换代码
命令：cnpm i --save-dev babel-loader babel-core babel-preset-env
babel-loader降版本：cnpm --save-dev babel-loader@7.1.1
babel-loader=====>es6 进行转义 ==》（前端的export与export default 规范）
在app文件夹中创建文件夹，名为：export与export_default和import，在这个文件夹下创建四个文件，分别为：1export与import,js 2export_default和import.js index.html main.js。
在第一个文件中输入：export var firstName = 'Michael';
		    export var lastName = 'Jackson';
		    export var year = 1958;
在第二个文件中输入：export default () =>{
   			 console.log(1111)
			}
在第三个文件中引入：main.js
在第四个文件中输入：import {firstName, lastName, year} from './1export与import.js';
		    console.log(firstName);
		    console.log(lastName);
		    console.log(year);
运行export与export_default和import文件夹下的index.html,发现报错，于是证明这个export和export default的引用，必须有babel，当把前两个js文件引入到app下面的main.js文件中，打包，就可以运行了。引入方式：
import {firstName, lastName, year} from './export与export_Default和import/1export与import.js';
console.log(firstName);
console.log(lastName);
console.log(year);
import obj from './export与export_Default和import/2export_default和import.js'
console.log(obj);


8.应用于组件
在app文件夹中创建todoList.js和todoList.css两个文件
js文件内容为：
import wyq_css from './todoList.css'

Vue.component('todoList',{
    data(){
        return{
            wyq_css:wyq_css
        }
    },
    template:`
        <div :class="wyq_css.wrap">
            随便写写
        </div>`
});
css文件内容为：
.wrap{
    color: red;
    font-size: 30px;
    font-weight: 900;
}
在index.html中引入
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>并写好组件的基本格式
在main.js引入：
require('./todoList.js');
对css进行打包
安装style-loader 和css-loader
命令：cnpm i --save-dev style-loader 和 css-loader
css-loader的版本号改成0.28.11
在webpack.config.js文件中配置：
module:{
    rules:[
	   {
                // 必须要有 一个用以匹配loader所处理文件的扩展名的正则表达式
                test:/\.js$/,
                // 后面配置的是 loader的名称
                use:'babel-loader',
                // include / exclude 必须处理的文件和需要屏蔽的文件
                exclude:/node_modules/
            },// 安装style-loader 和css-loader
            {
                test:/\.css$/,
                // 配置多个loader的时候 use=> value 是 数组
                // 如果没有额外配置 直接String
                // 如果有 为json对象
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            // 把css 当成模块 => json对象来看待
                            modules:true,//指定启用css modules
                            localIdentName:'[name]_[local]--[hash:base64:5]'//指定css的类名格式
                        }
                    }
                ]
            }
	]
}
打包运行，样式就显示出来啦。

打包图片：
下载file-loader / url-loader
命令：cnpm i --save-dev file-loader url-loader
在根目录下创建文件夹image，放入small和big两张图片
在todoList.js文件中引入两张图片：
import wyq_css from './todoList.css'
let big = require('../image/big.jpg');
let small = require('../image/small.png');

Vue.component('todoList',{
    data(){
        return{
            wyq_css:wyq_css,
            big:big,
            small:small
        }
    },
    template:`
        <div :class="wyq_css.wrap">
            个如果确认过去人工
            <img :src="big" alt="">
            <img :src="small" alt="">
        </div>`
});
在webpack.config.js文件夹中配置：
{
                // 图片格式正则
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        // 配置 url-loader 的可选项
                        options: {
                            // 限制 图片大小 10000B，小于限制会将图片转换为
                            // base64格式
                            limit: 10000,
                            // 超出限制，创建的文件格式
                            // build/images/[图片名].[hash].[图片格式]
                            name: 'images/[name].[hash].[ext]'
                        }
                    }
                ]
            }
打包运行，图片显示。

背景图引入方式：
在todoList.js文件中：
let css_json = require('./todoList.css');
let img = require('./images/big.jpg');
console.log(css_json);
Vue.component('todoList',{
    template:`
    <div :class="css_json.wrap">累了累了
	//这个地方关键，注意写法，才能引入背景图
        <div :class="css_json.a">12345</div>
        <div class="b">678910</div>
        <img :src="img" alt="">
    </div>
    `,
    data(){
        return{
            css_json:css_json,
            img:img
        }
    }
});
在todoList.css文件中：
.wrap{
    font-size: 60px;
    color: green;
}
.a{
    background: url("./images/small.png");
}
打包运行。

9.plugins插件
插件需要用require引入
用的webpack自带的插件
在webpack.config.js文件中配置：
let webpack = require('webpack');
plugins: [
        new webpack.BannerPlugin('webpack快写完了！！！')
    ]
自带的插件，打包运行后会在创建的build_main.js 文件最上面显示后面输入的内容

HtmlWebpackPlugin插件
(作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html)
下载命令:
        npm in --save-dev html-webpack-plugin
需要对文件有所改动如下:
新建index.tmpl.html在app下
新建文件夹build
新建一个webpack.config.js
出入口配置为：
entry: __dirname + '/app/main.js',
    output: {
        path:__dirname + '/build',
        filename: 'build_main-[hash].js'
    },
在webpack.config.js中引用
const HtmlWebpackPlugin = require('html-webpack-plugin');

new HtmlWebpackPlugin({
template:__dirname + "/app/index.tmpl.html"
})
打包运行后，会自动在build文件夹中生成index.html文件

优化插件：
OccurenceOrderPlugin :   为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID；
UglifyJsPlugin：         压缩JS代码；
ExtractTextPlugin：      分离CSS和JS文件；
但是:OccurenceOrder 和 UglifyJS plugins 都是内置插件，你需要做的只是安装其它非内置插件。
//压缩代码UglifyJsPlugin：
下载命令:
        npm install --save-dev extract-text-webpack-plugin
引用:
        let UglifyJsPlugin = require('uglify-js-plugin');
在配置文件的plugins后引用它们
        new webpack.optimize.UglifyJsPlugin(),
此时执行npm start可以看见代码是被压缩后的JS。
缓存: （内容改变，名称相应改变）
webpack可以把一个哈希值添加到打包的文件名中，代码如下:
    output: {
    path: __dirname + '/build',
    filename: "build_main[hash].js"
    },
去除build文件中的残余文件

添加了hash之后，会导致改变文件内容后重新打包时， 文件名不同而内容越来越多,
因此需要插件clean-webpack-plugin
clean-webpack-plugin
下载命令:
        cnpm i --save-dev clean-webpack-plugin
引入clean-webpack-plugin插件
    Let CleanWebpackPlugin = require("clean-webpack-plugin");
在配置文件的plugins中做相应配置
// 去除build文件中的残余文件
        new CleanWebpackPlugin('build/*.*', {
        // 绝对路径
        root: __dirname,
        //将日志写入控制台。
        verbose: true,
        ////使用布尔“true”来测试/模拟删除。 （不会删除文件）。
        //默认值：false - 删除文件
        dry: false
        })

分离CSS和JS文件
命令：cnpm install --save-dev extract-text-webpack-plugin
引入ExtractTextPlugin插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
在配置文件的plugins中做相应配置即可
new ExtractTextPlugin("style.css"),
坑！！！！！
打包前，把webpack.config.js文件中的css的use的配置改为：
use : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use     :  {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                })
打包，在build文件夹中生成style.css文件