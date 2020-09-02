//导入mongoose模块
const mongoose = require('mongoose');

//定义User的约束
const User = mongoose.model('User', new mongoose.Schema({
    name: {type: String, require: true},
    password: {type: String, require: true, select: false},
    avatar_url: {type: String},
    gender: {type: String, enum: ['male', 'female'], default: 'male', require: true},
    //一句话简介
    headline: {type: String},
    //居住地
    locations: {type: [{type: String}], select: false},
    //行业
    business: {type: String, select: false},
    //工作经历
    employments: {
        type: [{
            company: {type: String},
            job: {type: String},

        }],
        select: false
    },
    //教育经历
    educations: {
        type: [{
            school: {type: String},
            major: {type: String},
            diploma: {type: Number, enum: [1, 2, 3, 4, 5]},
            entrance_year: {type: Number},
            graduation_year: {type: Number}
        }],
        select: false
    }
}, {__id: true}));

//导出User模型对象
module.exports = User