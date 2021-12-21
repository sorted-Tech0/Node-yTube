const express = require('express');

const app = express();

app.listen(8080,  () => {
    console.log('server is listening at port 8080');
})
/* sending msg normally
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
    // res.send('Hello world!');
});

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>');
})
How to send html files
*/

app.get('/', (req, res) => {
    // one way to send path of the file
    res.sendFile('Z:/Doing/pepNode/view/index.html');
});

app.get('/about', (req, res) => {
    // another and preffered way, by relative path
    res.sendFile('view/about.html', {root: __dirname});
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page

app.use( (req, res) => {
    res.status(404).sendFile('view/404.html', {root:__dirname});
})


//Note: if the made route won't match to the url then, app.use() route will be used. And we need to specify the status code for error page manually, o/w it will show 200 i.e. success which is not supposed to be.
// Always put 404 page at the end.
