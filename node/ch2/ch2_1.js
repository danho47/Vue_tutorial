//requireメソッド:Node.js独特の「モジュールローディングシステム」を利用
//「http」オブジェクトのロード
const http = require('http');

//基本　require, createServer, listen
var server = http.createServer(
    (request, response)=>{
        response.setHeader('Context-Type', 'text/html');
        response.write('<!DOCTYPE html><html lang ="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title></head>');
        response.write('<body><h1>Hello Node.js!</h1>');
        response.write('<p>This is sample page.</p>');
        response.write('<p>これはサンプルページです</p>','utf-8');
        response.write('</body></html>');
        response.end();
    }
);

server.listen(3000);
console.log('Server Start!')