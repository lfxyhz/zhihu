/*
    统一返回类型
 */
class Result {
    result(code, msg, data) {
        return {code, msg, data}
    }

    //成功
    success(sucObj, data){
        return this.result(sucObj.code, sucObj.msg, data)
    }

    //失败
    error(errObj){
        return this.result(errObj.code, errObj.msg, null)
    }
}

//导出工具类对象
module.exports = new Result()