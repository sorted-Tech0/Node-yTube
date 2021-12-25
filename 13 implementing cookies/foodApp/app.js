const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const userModel = require('./models/userModel');

app.use(express.json());
app.listen(8080, () => {
    console.log('server is listening at port 8080');
});
app.use(cookieParser());

// let users = [
//     {
//         'id':1,
//         'name':"Alex"
//     },
//     {
//         'id':2,
//         'name':"Mark"
//     },
//     {
//         'id':3,
//         'name':"Janefer"
//     }
// ];

const userRouter = express.Router();
const authRouter = express.Router();

app.use('/users', userRouter);
app.use('/auth', authRouter);

// mounting
userRouter
.route('/')
.get(getUsers)
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

authRouter
.route('/signup')
.get(middleware1,getSignUp, middleware2)
.post(postSignUp)


async function getUsers(req, res){
    //let allUsers = await userModel.find().exec();// find all the records in userModel
    let allUsers = await userModel.findOne({name:'Sonu'}).exec();  // returns only first value matched document
    res.json({
        Message: "list of all users",
        data: allUsers
    })
};

function postUser(req, res){
    console.log(req.body);
    users.push(req.body);
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

function middleware1(req, res, next) {
    console.log('middleware1 encountered.');
    next();
}

function middleware2(req, res) {
    console.log('middleware2 encountered.');
    console.log('res send to the frontend');
    res.sendFile('./public/index.html',{root:__dirname});
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

/*
Note: Instead of setting header and setting cookie by ourself we can make use of cookie-parser npm package
we use that globally, and function signature of cookie is
res.cookie('cookie-name', value, maxAge, secure:true, httpOnly:true);

maxAge: means for how much time you want to expire the session
secure: true, means it should be secure
httpOnly:true, always make them because they prevent the memory leakage And now we can't access the cokkies from from frontend now.
*/