const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    console.log('request has been made from browser to server');
    // console.log(req.method);
    // console.log(req.url);
    // res.setHeader('Content-Type', 'text/plain');
    // res.write("Hello World!");
    // res.end();

    // sending back to browser as html file
    // res.setHeader('Content-Type', 'text/HTML');
    // fs.readFile('./view/index.html', (err, fileData) => {
    //     if(err){
    //         console.log(err);
    //     } else{
    //         // res.write(fileData);
    //         // res.end();
    //         res.end(fileData);
    //     }
    // });

    res.setHeader('Content-Type', 'text/html');
    let path = './view';
    switch(req.url){
        case '/':
            path += '/index.html';
            break;
        case '/about':
            path += '/about.html';
            break;
        default:
            path += '/404.html';
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