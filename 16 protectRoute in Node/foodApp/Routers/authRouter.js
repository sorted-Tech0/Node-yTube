const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

// writing login route

authRouter.route("/login").post(loginUser);

function middleware1(req, res, next) {
  console.log("middleware1 encountered.");
  next();
}

function middleware2(req, res) {
  console.log("middleware2 encountered.");
  console.log("res send to the frontend");
  res.sendFile("Z:/Doing/pepNode/foodApp/public/index.html");
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
    Message: "user signed up",
    data: user,
  });
}

async function loginUser(req, res) {
  try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                // bcrypt-> compare function which compare encrypt function and provided functions but now we have commented of salt pre hook for encrypting the password in userModel remember
                if (user.password == data.password) {
                    res.cookie('isLoggedIn', true, {httpOnly:true});
                    res.json({
                        Message: "user signed in successfully",
                        userDetails: data,
                    });
                }else {
                    res.json({
                        Message: "wrong credentials",
                    });
                }
            }else{
                res.json({
                Message: "user not found.",
                });
            }
        }else {
            res.json({
                Message: "empty field found.",
            });
        }
    } 
    catch (error) {
        return res.status(500).json({
        Message: error.Message,
        });
    }
}

module.exports = authRouter;
