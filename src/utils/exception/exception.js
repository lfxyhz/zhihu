/**
 * 全局统一异常处理
*/
//导入统一返回工具类
const result = require('../result/result')

module.exports = async (ctx, next) => {
    try {
        await next()
    }catch (e) {
        console.log("错误对象", e.code, e.message)
        return ctx.body = result.error({code: e.code, msg: e.message})
    }
}