const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');

authRouter
.route('/signup')
.get(middleware1,getSignUp, middleware2)
.post(postSignUp)


function middleware1(req, res, next) {
    console.log('middleware1 encountered.');
    next();
}

function middleware2(req, res) {
    console.log('middleware2 encountered.');
    console.log('res send to the frontend');
    res.sendFile('Z:/Doing/pepNode/foodApp/public/index.html');
}

function getSignUp(req, res, next) {
    console.log("getSignUp encountered.");
    next();
}

async function postSignUp(req, res) {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    // console.log('backend ', user);
    res.json({
        Message:'user signed up',
        data: user
    })
};

module.exports = authRouter;