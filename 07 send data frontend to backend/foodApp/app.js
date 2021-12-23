const express = require('express');
const fs = require('fs');

const app = express();
// middleware function of post
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
.get(getSignUp)
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

function getSignUp(req, res) {
    res.sendFile('./public/index.html',{root:__dirname});
    // fs.readFile('./public/index.html', (err, fileData) => {
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.write(fileData);
    //         res.end();
    //     }
    // })
    
}

function postSignUp(req, res) {
    let obj = req.body;
    console.log('backend ', obj);
    res.json({
        Message:'user signed up',
        data: obj
    })
};