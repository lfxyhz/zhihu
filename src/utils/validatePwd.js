/**
 * 密码验证
 */
//导入加密模块
const crypto = require('crypto')

class ValidatePwd {
    //校验密码是否相等
    isValid(pwd, oldPwd){
        const newPwd = crypto.createHash('md5').update(pwd).digest('hex')
        return newPwd === oldPwd
    }

    //加密
    encrypt(pwd){
        return crypto.createHash('md5').update(pwd).digest('hex')
    }
}

//导出对象
module.exports = new ValidatePwd()