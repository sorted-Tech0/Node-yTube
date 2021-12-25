const express = require('express');
const app = express();
const userModel = require('./models/userModel');

app.use(express.json());
app.listen(8080, () => {
    console.log('server is listening at port 8080');
});

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
