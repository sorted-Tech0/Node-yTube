const express = require('express');

const app = express();
// middleware function of post
app.use(express.json());

app.listen(8080, () => {
    console.log('server is listening at port 8080');
});

let users = {};

app.get('/users', (req, res) => {
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

