/**
 *  用户模块控制器
 */
//导入统一返回工具类
const result = require('../utils/result/result')
//导入返回类型枚举对象
const resEnum = require('../utils/result/resEnum')
//导入token工具类
const jwtToken = require('../utils/jwtToken')
//导入加密工具类
const crypto = require('../utils/validatePwd')
//导入用户模型
const User = require('../models/User')

class UserCtl {
    /**
     * 用户注册
     * @param ctx
     * @returns {Promise<{msg: *, code: *, data: *}>}
     */
    async createUser(ctx) {
        //验证数据
        ctx.verifyParams({
            name: {type: 'string', require: true},
            password: {type: 'string', require: true}
        })
        const {name, password} = ctx.request.body
        //验证用户ID唯一性
        if (await User.findOne({name})) return ctx.body = result.error(resEnum.NAME_NOT_ONLY)
        //添加用户
        const user = await new User({name, password: crypto.encrypt(password)}).save()
        user.password && delete user.password
        //返回json
        ctx.body = result.success(resEnum.REGISTER_SUC, user)
    }

    /**
     * 更新用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async updateUser(ctx) {
        console.log('校验参数', ctx.params.id)
        //校验参数
        ctx.verifyParams({
            name: {type: 'string', required: true},
            password: {type: 'string', required: false},
            gender: {type: 'string', required: false},
            avatar_url: {type: 'string', required: false},
            headline: {type: 'string', required: false},
            locations: {type: 'array', itemType: 'string', required: false},
            business: {type: 'string', required: false},
            employments: {type: 'array', itemType: 'object', required: false},
            educations: {type: 'array', itemType: 'object', required: false}
        })
        //调用更新接口
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body,)
        //返回响应
        ctx.body = result.success(resEnum.USER_INFO_UPDATE_SUC, user)
    }

    /**
     * 用户登录
     * @param ctx
     * @returns {Promise<{msg: *, code: *, data: *}>}
     */
    async userLogin(ctx) {
        //校验参数
        ctx.verifyParams({
            name: {type: 'string', require: true},
            password: {type: 'string', require: true}
        })
        let user = ctx.request.body
        user.password = crypto.encrypt(user.password)
        //查询用户是否存在
        user = await User.findOne(user)
        if (!user) return ctx.body = result.error(resEnum.LOGIN_ERR)
        //用户存在则计算token
        const token = jwtToken.generateToken({id: user._id, name: user.name})
        //返回响应
        user.password && delete user.password
        user = JSON.parse(JSON.stringify(user))
        ctx.body = result.success(resEnum.LOGIN_SUC, {...user, token})
    }

    /**
     * 获取用户列表
     * @param ctx
     * @returns {Promise<void>}
     */
    async getUserList(ctx) {
        //调用查询接口
        ctx.body = await User.find()
    }

    /**
     * 根据用户ID查询个人详情信息
     * @param ctx
     * @returns {Promise<{msg: *, code: *, data: *}>}
     */
    async getUserById(ctx) {
        //从URL查询字符串中获取fields
        const {fields} = ctx.query
        let selectStr = null
        if (fields) selectStr = fields.split(';').filter(f => f).map(f => '+' + f).join(' ')
        console.log(selectStr)
        const userId = ctx.params.id
        if (!userId) return ctx.body = result.error(resEnum.PARAMS_ERR)
        //从数据库查数据
        const user = await User.findById(userId).select(selectStr)
        return ctx.body = result.success(resEnum.REQ_SUC, user)
    }
}

//导入控制器对象
module.exports = new UserCtl()