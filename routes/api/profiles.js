// 用户login 与 register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile.js');
// 路径记得加/ ，不然会报错 404 资源找不到
router.get("/test",(req,res)=>{
    res.json({msg:"Profile works"})
})

// add接口
// $route  POST api/profiles/add
// @desc 
// @access private
router.post("/add",passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        //  console.log('profiles',req)
        const profileFields = {}
        if(req.body.type) profileFields.type = req.body.type
        if(req.body.describe) profileFields.describe = req.body.describe
        if(req.body.xuhao) profileFields.xuhao = req.body.xuhao
        if(req.body.name) profileFields.name = req.body.name
        if(req.body.sex) profileFields.sex = req.body.sex
        if(req.body.zhuanye) profileFields.zhuanye = req.body.zhuanye
        if(req.body.remark) profileFields.remark = req.body.remark
        if(req.body.date) profileFields.date = req.body.date
        const profile1 = new Profile(profileFields)
        profile1.save()
                .then(profile => {
                    res.json(profile);
                })
                .catch(
                    err => res.json(err)
                )
})
// 获得所有数据接口
// $route  POST api/profiles/
// @desc 
// @access private
router.get("/",passport.authenticate('jwt', { session: false }),
        (req,res)=>{
            Profile.find()
                   .then(profile=>{
                    if(!Profile) return req.status(404).json('没有任何内容')
                    res.json(profile);
                    })
                    .catch(err=>{res.status(404).json(err)})
                
            
        }
)
// 获得符合条件的数据接口
// $route  POST api/profiles/:id
// @desc 
// @access private
router.get("/:id",passport.authenticate('jwt', { session: false }),
        (req,res)=>{
            Profile.findOne({_id:req.params.id})
                   .then(profile=>{
                    if(!Profile) return req.status(404).json('没有任何内容')
                    res.json(profile);
                    })
                    .catch(err=>{res.status(404).json(err)})
                
            
        }
)
// 修改数据接口
// $route  POST api/profiles/edit:id
// @desc 
// @access private
router.post("/edit/:id",passport.authenticate('jwt', { session: false }),
        (req,res)=>{
            const profileFields = {}
            if(req.body.type) profileFields.type = req.body.type
            if(req.body.describe) profileFields.describe = req.body.describe
            if(req.body.xuhao) profileFields.xuhao = req.body.xuhao
            if(req.body.name) profileFields.name = req.body.name
            if(req.body.sex) profileFields.sex = req.body.sex
            if(req.body.zhuanye) profileFields.zhuanye = req.body.zhuanye
            if(req.body.remark) profileFields.remark = req.body.remark
            if(req.body.date) profileFields.date = req.body.date
            // Profile.updateOne(查询条件对象，更改数据对象，回调函数)
            // 为什么不用updateOne：因为返回的结果不是修改后的数据
            // findOneAndUpdate返回的就是更改后的那个数据
            // 这个url详细讲解了他们的区别https://juejin.cn/post/6844904106373578759
            Profile.findOneAndUpdate(
                {_id:req.params.id},
                {$set:profileFields},
                { new: true }
            ).then(profile => {res.json(profile)
            // console.log('1111',profile)
            })
             .catch(err => {res.json('修改失败',err)
            //  console.log('2222')
            })
            // { acknowledged: true }
        }
)
// 删除数据接口
// $route  POST api/profiles/delete/:id
// @desc 
// @access private
// router.delete("/delete/:id",passport.authenticate('jwt', { session: false }),
//         (req,res)=>{
//             Profile.findOneAndRemove({_id:req.params.id})
//                 .then(profile => {
//                     profile.save().then(profile => res.json(profile));
//                   })
//                 .catch(err => res.status(404).json('删除失败!'))
//         }
// )
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ _id: req.params.id })
        .then(profile => { res.json(profile)
        //   profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json('删除失败!'));
    }
  );
module.exports = router