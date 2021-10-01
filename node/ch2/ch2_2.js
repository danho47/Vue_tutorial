const http = require('http');
const fs = require('fs');

var server = http.createServer(
    (require, response) => {
        fs.readFile('./ch2_2.html','UTF-8',
            (error, data) => {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            });
    }
);

server.listen(3000);
console.log('Server start!')