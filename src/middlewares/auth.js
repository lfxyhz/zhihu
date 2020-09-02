/**
 * 用户认证中间件
 */
//导入解析token工具
const jsonToken = require('../utils/jwtToken')
//导入异常枚举模块
const errEnum = require('../utils/exception/errEnum')
//导入自定义异常类
const NewError = require('../utils/exception/NewError')
//导入路由白名单配置
const routerWhiteList = require('../config/routerWhiteList')

module.exports = async (ctx, next) => {
    //判断路由白名单
    if (routerWhiteList[ctx.url] !== ctx.request.method) {
        //获取请求头的authorization字段
        const {authorization} = ctx.request.header
        if (!authorization) throw new NewError(errEnum.TOKEN_INVALID)
        const token = authorization.split(' ')[1]
        //从token中解析用户信息，并挂载到ctx上
        ctx.state.user = jsonToken.resolveUser(ctx, token)
    }
    //执行下一个中间件
    await next()
}