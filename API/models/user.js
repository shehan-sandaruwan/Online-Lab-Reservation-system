const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../../config/database');

// create UserSchema

const UserSchema = mongoose.Schema({

    user_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    designation:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

});
const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByEmail = function(email,callback){
    const query = {email:email}
    User.findOne(query,callback);
}

module.exports.addUser= function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}   