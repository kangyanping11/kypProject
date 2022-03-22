// 使用express去创建本地服务器，提供api
const express =require("express");

// 使用mongoose去连接mongoDB数据库
const mongoose = require ("mongoose")

//导入body-parser，来处理前端传过来的请求体数据
const bodyParser = require("body-parser")

// passport中间件用来验证用户的身份
const passport = require("passport")

const app = express();
// 导入 自定义 模块 （路由模块）
const users = require('./routes/api/users.js');
const profiles = require('./routes/api/profiles.js');

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// DB config
const db = require('./config/keys').mongoURI;
//  mongoose模块连上了MongoDB数据库
// connect 函数返回了一个 Promise 实例
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// 初始化passport，初始化以后才能对passport正常使用
app.use(passport.initialize());
// 引入./config/passport文件，同时把passport对象传递给./config/passport文件
require("./config/passport")(passport)

// // 测试浏览器能否访问服务器（服务器起来了没）
// app.get("/",(req,res)=>{
//     res.send("Hello World!!")
// })

// 使用routes  （路径名，对应的路由）
app.use('/api/users', users);
app.use('/api/profiles', profiles);

// 服务器端口
const port = process.env.PORT || 5000;

// 监听端口
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})