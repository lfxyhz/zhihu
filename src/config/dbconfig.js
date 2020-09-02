//导入mongoose
const mongoose = require('mongoose')

// 数据库配置
const dbCfg = {
    // 数据库详细信息
    DATABASE: 'zhihu',
    USERNAME: '',
    PASSWORD: '',
    PORT: '27017',
    HOST: 'localhost'
}

//导出数据库连接函数
module.exports = () => {
    const DB_URL = `mongodb://${dbCfg.HOST}:${dbCfg.PORT}/${dbCfg.DATABASE}`
    mongoose.set('returnOriginal', false);
    mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    //监听连接
    mongoose.connection.on('connected', () => console.log('MongoDb is running...'))
    //监听异常
    mongoose.connection.on('error', console.error)
    //监听异常断开
    mongoose.connection.on('disconnected', () => console.log('Mongoose connection disconnected...'))
}