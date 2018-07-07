const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkAuth = require('../middleware/check -auth');

//sign up

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length>=1){
            return res.status(409).json({
                message: 'Mail exists'
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err,
                        message:'Oops.. There is an error'
                    });
                } else{
                     const user = new User({
                     user_name:req.body.user_name,
                     designation:req.body.designation,
                     email:req.body.email,
                     password:hash
                    });
                    user.save().then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message:'User created'
                        });
                     })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });
            }
         });
        }
    })
});


router.get('/',(req,res)=>{
    User.find()
    .exec()
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        res.json({
            error:err
            
        });
    });
});

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'Auth failed',
                success:false,
                status:401
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                   err
                });
            }
            if(result){
                const JWT_KEY ="this is secrete";
                const token = jwt.sign(
                    {
                        email:user[0].email,
                        user_id:user[0]._id,
                        user_name:user[0].user_name
                    },
                    JWT_KEY,
                    {
                        expiresIn:"1h"
                    }
                 );
                return res.status(200).json({
                    message:'Auth succeccful',
                    success:true,
                    email:user[0].email,
                    user:user[0].user_name,
                    token: token
                });
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            err     
        });
    })
});

router.get('/validate',(req,res,next)=>{
    res.send('validate')
});


module.exports = router;