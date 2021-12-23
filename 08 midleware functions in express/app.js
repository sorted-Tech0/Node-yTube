const express = require('express');

const app = express();

app.listen(8080,  () => {
    console.log('server is listening at port 8080');
})

app.get('/', (req, res) => {
    res.sendFile('Z:/Doing/pepNode/view/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile('view/about.html', {root: __dirname});
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use( (req, res) => {
    res.status(404).sendFile('view/404.html', {root:__dirname});
})

