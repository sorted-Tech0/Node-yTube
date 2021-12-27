const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const protectRoute = require('./authHelper');

userRouter
.route('/')
.get(protectRoute,getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/getCookies')
.get(getCookies)

userRouter
.route('/setCookies')
.get(setCookies)

userRouter
.route('/:id')
.get(getUserById)



async function getUsers(req, res){
    let users = await userModel.find().exec();
    if(users){
        return res.json(users);
    } else {
        res.json({
            Message: "user not found"
        })
    }
    
};

function postUser(req, res){
    console.log(req.body);
    // users.push(req.body);
    res.json({
        Message: "data send successfully",
        data: req.body
    });
};

async function updateUser(req, res){
    // console.log(req.body);
    let dataToBeUpdated = req.body;
    // for(key in dataToBeUpdated){
    //     users[key] = dataToBeUpdated[key];
    // }
    let user = await userModel.findOneAndUpdate({email:"sonu@gmail.com"}, dataToBeUpdated);
    res.json({
        Message:"data has been updated."
    });
};

async function deleteUser(req, res){
    let dataToBeDeleted = req.body;
    // let user = await userModel.findOneAndDelete({email:"abc@gmail.com"});
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        Message: "data deleted successfully",
        data: user
    });
};

function getUserById(req, res){
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    for(let i = 0; i < users.length; i++){
        if(users[i]['id'] == paramId){
            obj = users[i];
        }
    }
    res.json({
        Message:'user id is received.',
        data:obj
    });
}


function setCookies(req, res) {
    // res.setHeader('Set-Cookie', 'isLoggedIn=ture');
    res.cookie('isLoggedIn', false, {maxAge:1000*60*60*24, secure:true, httpOnly: true});
    // res.cookie('isPrimeMember', true);
    res.send('cookies has been set');
}

function getCookies(req, res) {
    let cookies = req.cookies;
    console.log(cookies);
    res.send('cookies recevied.')
}



module.exports = userRouter;