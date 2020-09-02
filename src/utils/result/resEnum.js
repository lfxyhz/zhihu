module.exports = {
    // 格式：key: {code: , msg: }

    //通用成功格式
    REQ_SUC: {code: 200, msg: '请求成功'},

    //注册成功
    REGISTER_SUC: {code: 200, msg: "注册成功"},
    //登录失败
    LOGIN_ERR: {code: 400, msg: "用户名或密码错误"},
    //登录成功
    LOGIN_SUC: {code: 200, msg: "登录成功"},
    //上传图片成功
    UPLOAD_IMAGE_SUC: {code: 200, msg: '图片上传成功'},
    //用户名已被占用
    NAME_NOT_ONLY: {code: 402, msg: '用户名已被占用'},
    //用户信息更新成功
    USER_INFO_UPDATE_SUC: {code: 200, msg: '用户信息更新成功'},
    //客户端传递参数异常
    PARAMS_ERR: {code: 400, msg: '客户端传递参数异常'},
    //
}