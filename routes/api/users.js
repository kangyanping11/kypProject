// 用户login 与 register
const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
// 使用全球公用头像gravatar
const gravatar = require("gravatar")
const keys = require('../../config/keys');
const passport = require('passport');

// 路径记得加/ ，不然会报错 404 资源找不到
router.get("/test",(req,res)=>{
    res.json({msg:"login works"})
})

// 注册的接口  
// $route  POST api/users/register
// @desc 返回请求的json数据
// @access piblic
router.post("/register",(req,res)=>{
    console.log('req.body',req.body);
    // 查询数据库中是否拥有邮箱 mongoDB的findOne方法，查询文档
    User.findOne({email:req.body.email}).then(
        function(user){
        if(user){
            console.log('邮箱已被注册user',user)
            return res.status(400).json("邮箱已被注册")
        }else{
            // 使用全球公用头像gravatar
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
              });

            const newUser = new User ({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,
                identity:req.body.identity
                
            })
            console.log('邮箱没有被注册')

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                //  hash 是加密后的密码
                  newUser.password = hash;
        
                  newUser
                    .save()//把数据存到数据库中
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
        }
    }
    )
})


// 登录的接口  
// $route  POST api/users/login
// @desc 返回token  jwt（json web token） passport
// @access piblic
router.post("/login",(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    // 查询数据库 email:email es6缩写成email
    User.findOne({email}).then(user=>{
        if(!user){
            return res.status(404).json("用户不存在")
        }
        // 可以看出user是被查询中来的数据
        // 密码匹配
        bcrypt.compare(password,user.password).then(isMatch =>{
            if(isMatch){
                // jwt.sign("规则","加密名字","过期时间","箭头函数")
                // 规则 就是加密token的组成部分，解析token后，会显示出这些内容
                const rule = {
                    id: user.id,
                    name: user.name,
                    avatar:user.avatar,
                    identity:user.identity
                };
                jwt.sign(rule, keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                    if(err) throw err;
                    res.json({
                        success:true,
                        token: 'Bearer ' + token
                        // token:"kyp"+token
                    })
                })
                // res.json("密码正确")
            }else{
                return res.status(400).json("密码不正确")
            }
        })
    })

})

// 使用token并检验token的接口  
// $route  POST api/users/current
// @desc return current user
// @access private
// router.get("/current","验证token",(req,res)=>{})
// 使用passport来进行用户验证，因为前面使用的是token，用户登录后服务器会返回一个生成的token
// 用户后面登录的时候，服务器就根据token来判断，让用户拿到想要的数据。
// 用来验证用户的身份；而针对不同的验证方式，Passport 通过提供不同的验证策略(Strategies)
// 这里是验证cookie，所以使用passport 与 passport-jwt来实现验证
// token 对应的字段是放在头部的 Authorization  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDUzOGYwZmNiYTNjYmJkZGRjNjE3ZiIsIm5hbWUiOiJrIiwiYXZhdGFyIjoiLy93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci83Y2VmYmQzNWY0NzNmZjlmM2RiNmYyODZmNmFmMWZlYz9zPTIwMCZyPXBnJmQ9bW0iLCJpZGVudGl0eSI6ImVtcGxveWVlIiwiaWF0IjoxNjQxMzYzODc0LCJleHAiOjE2NDEzNjc0NzR9.rrhlVqPL1k8bPX6E2JK8OcVk1gTr0QUQlSdO1r8hG8E
router.get("/current",passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        // console.log('userreq',req)
        res.json({
            
            // user是passport.js文件夹传过来的,放在请求req对象里面了
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identity: req.user.identity
        });
})
module.exports = router