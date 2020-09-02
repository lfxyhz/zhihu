/**
 * 首页相关接口
 */
//导入path模块
const path = require('path')
//导入统一返回工具类
const result = require('../utils/result/result')
//导入统一返回枚举
const ResEnum = require('../utils/result/resEnum')

class HomeCtl {
    //上传图片
    uploadImage(ctx){
        console.log('控制器执行了......')
        //获取图片对象
        const file = ctx.request.files.file
        const basename = path.basename(file.path)
        //生成图片链接
        const url = `${ctx.origin}/images/${basename}`
        //返回图片链接
        ctx.body = result.success(ResEnum.UPLOAD_IMAGE_SUC, url)
    }
}

//导出对象
module.exports = new HomeCtl()