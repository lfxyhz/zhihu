//导入用户控制器
const {createUser, userLogin, getUserList, updateUser, getUserById} = require('../controllers/users')
//引入路由模块
const Router = require('koa-router')
//创建路由对象
const router = new Router({prefix: "/users"})
//导入权限模块
const {modifySelf} = require('../middlewares/permissions')

//用户注册
router.post('/', createUser)

//用户登录
router.post('/login', userLogin)

//获取用户列表
router.get('/', getUserList)

//更新用户信息
router.patch(`/:id`, modifySelf, updateUser)

//根据ID获取用户详情信息
router.get('/:id', getUserById)

//导出路由对象
module.exports = router

