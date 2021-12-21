const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    console.log('request has been made from browser to server');

    res.setHeader('Content-Type', 'text/html');
    let path = './view';
    switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, fileData) => {
        if(err){
            console.log(err);
        } else{
            res.write(fileData);
            res.end();
        }
    })

});

server.listen(8080, 'localhost',  () => {
    console.log('server is listening at 8080');
});
