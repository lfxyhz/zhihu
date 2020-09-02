/**
 * 处理token
 */
//导入jwt库
const jsonWebToken = require('jsonwebtoken')
//导入密钥配置
const {SECRET} = require('../config/appconfig')
//导入自定义异常类
const NewError = require('../utils/exception/NewError')
//导入异常枚举模块
const errEnum = require('../utils/exception/errEnum')

class JwtToken {
    //生成token
    generateToken(user){
        return jsonWebToken.sign(user, SECRET, {expiresIn: '7d'})
    }

    //解析token
    resolveUser(ctx, token){
        try {
            return jsonWebToken.verify(token, SECRET)
        }catch (e) {
            throw new NewError(errEnum.TOKEN_INVALID)
        }
    }

    //刷新token
    refreshToken(){}

    //判断token是否过期
    isExpire(token){}
}

//导出对象
module.exports = new JwtToken()