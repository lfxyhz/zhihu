//导入自定义异常类
const NewError = require('../utils/exception/NewError')
//导入异常枚举
const errEnum = require('../utils/exception/errEnum')

//导出权限函数
module.exports = {
    //限制当前登录用户只能修改自己的用户信息
    async modifySelf(ctx, next) {
        // console.log(ctx.params.id, ctx.state.user)
        if (ctx.params.id !== ctx.state.user.id) throw new NewError(errEnum.NOT_PERMISSION)
        await next()
    }
}