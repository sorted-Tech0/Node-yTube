const express = require('express');

const app = express();
// middleware function of post
app.use(express.json());

app.listen(8080, () => {
    console.log('server is listening at port 8080');
});

let users = [
    {
        'id':1,
        'name':"Alex",
        'age':23
    },
    {
        'id':2,
        'name':"Mark",
        'age':24
    },
    {
        'id':3,
        'name':"Janefer",
        'age':25
    }
];

app.get('/users', (req, res) => {
    console.log(req.query);
    res.send(users);
});

// POST: to send the data from frontend to backend
app.post('/users', (req, res) => {
    // console.log(req.body);
    users = req.body;
    res.json({
        Message: "data send successfully",
        data: req.body
    });
})

// PATCH: to update the existing data

app.patch('/users', (req, res) => {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        Message:"data has been updated.",
        data: req.body
    });
})

// DETELE: to delete the data form user

app.delete('/users', (req, res) => {
    users = {};
    res.json({
        Message: "data deleted successfully",
        data: req.body
    });
})

// Parameters and queries

// params

app.get('/users/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.params);
    // console.log(req.params.username);
    res.send('user id is received.');
});
