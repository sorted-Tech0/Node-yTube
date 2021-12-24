const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.listen(8080, () => {
    console.log('server is listening at port 8080');
});

let users = [
    {
        'id':1,
        'name':"Alex"
    },
    {
        'id':2,
        'name':"Mark"
    },
    {
        'id':3,
        'name':"Janefer"
    }
];

const userRouter = express.Router();
const authRouter = express.Router();

app.use('/users', userRouter);
app.use('/auth', authRouter);

// mounting
userRouter
.route('/')
.get(getUser)
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


function getUser(req, res){
    res.send(users);
};

function postUser(req, res){
    console.log(req.body);
    // users = req.body;     // it is replacing whole object, however we need to add it
    users.push(req.body);
    res.json({
        Message: "data send successfully",
        data: req.body
    });
};

function updateUser(req, res){
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        Message:"data has been updated.",
        data: req.body
    });
};

function deleteUser(req, res){
    users = {};
    res.json({
        Message: "data deleted successfully",
        data: req.body
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
    // res.sendFile('./public/index.html',{root:__dirname});
    console.log("getSignUp encountered.");
    next();
}

function postSignUp(req, res) {
    let obj = req.body;
    console.log('backend ', obj);
    res.json({
        Message:'user signed up',
        data: obj
    })
};

// connecting to the database

let db_link = "mongodb+srv://admin:L2P3qRRpq80JZSzN@cluster0.iyb25.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then(function(db){
    console.log('database connected');
    // console.log(db);
})
.catch( function(err){
    console.log(err);
})

// making userSchema

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPpassword: {
        type: String,
        required: true,
        minLength: 8
    }

});

// creating model

const userModel = mongoose.model('usermodel', userSchema);

// creating users

(async function createUser() {
    let user = {
        name: "Monu",
        email: "monu@gmail.com",
        password: "12345",
        confirmPpassword: "12345"
    };
    let data = await userModel.create(user);
    console.log(data);
})();

// Note: If you try to create data with same email id, then your document won't be made off.