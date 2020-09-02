/**
 * 自定义错误类型
 */
class NewError extends Error{
    constructor({code, msg}) {
        super(msg)
        this.code = code
    }
}

//导出类对象
module.exports = NewError