const Koa = require('koa')
//导入path
const path = require('path')
//导入全局配置
const config = require('./src/config/appconfig')
//引入异常处理
const error = require('./src/utils/exception/exception')
//导入参数校验
const parameter = require('koa-parameter')
//导入请求解析器
const koaBody = require('koa-body')
//导入路由加载器
const routerLoader = require('./src/routes/index')
//导入认证授权中间件
const auth = require('./src/middlewares/auth')
//导入静态文件中间件
const koaStatic = require('koa-static')
//导入mongodb连接器
const connectMongoDbFunc = require('./src/config/dbconfig')

//创建应用程序对象
let app = new Koa()
//开放静态文件
app.use(koaStatic(path.join(__dirname, '/src/public')))
//参数校验
app.use(parameter(app))
//处理异常
app.use(error)
//认证和授权
app.use(auth)
//解析请求
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/src/public/images'),
        keepExtensions: true
    }
}))
//使用路由加载器加载路由
routerLoader(app)
//执行连接器
connectMongoDbFunc()
//监听端口
app.listen(config.PORT, () => console.log("app is running..."))
