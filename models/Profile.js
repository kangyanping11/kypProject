const mongoose = require('mongoose')
const ProfileSchema = new mongoose.Schema({
    type: {
        type: String
    },
    describe: {
        type: String
    },
    xuhao: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    zhuanye: {
        type: String
    },
    remark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})
// Profiles 是模型的名字 （就是表的名字）
module.exports = Profile = mongoose.model('profile', ProfileSchema)