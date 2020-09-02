//导入路由模块
const Router = require('koa-router')
//导入控制器模块
const homeCtl = require('../controllers/home')

//实例化路由对象
const router = new Router()

router.post('/uploads', homeCtl.uploadImage)

//导出路由对象
module.exports = router
