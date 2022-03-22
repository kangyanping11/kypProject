// 创造模型
const mongoose = require("mongoose");
// const Schema =  mongoose.Schema;
// const UserSchema =  new Schema(
// 制定规则
const UserSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    identity:{
        type:String,
        required:true
    },
    data:{
        type:Date,
        default:Date.now
    },
});
// 根据规则创建一个 Model 【注意这里通过mongoose来调用model函数】
// users 是模型的名字 （就是表的名字）
const User = mongoose.model("users",UserSchema);
module.exports =  User
