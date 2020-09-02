//加载路由模块下所有的路由
const fs = require('fs')

//加载路由模块下的所有文件
module.exports = app => {
    //读取当前目录下的所有文件
    fs.readdir(__dirname, (err, files) => {
        //处理异常
        if (err) return err
        //遍历所有文件
        files.forEach((item, index) => {
            //排除自己
            if (item === 'index.js') return
            const router = require(`./${item}`)
            //加载所有的路由文件
            app.use(router.routes())
        })
    })
}