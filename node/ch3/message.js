//テンプレートエンジン
const http = require('http')
const fs = require('fs')
//ejsオブジェクト読み込み
const ejs = require('ejs');
const url = require('url')
//query textを処理するモジュール
const qs = require('querystring');

//テンプレートファイル読み込み
//readFile: 非同期処理。ファイル読み込み終わってなくても次の処理。
//読み込み終わったらコールバック処理であとの処理に回す。
//readFileSync: 同期処理。ファイル読み込んでから次に進む。
const index_page = fs.readFileSync('./index_3-2.ejs','utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');
const other_page = fs.readFileSync('./other.ejs','utf-8');

var server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!');


//createServerの処理
function getFromClient(request, response){
    //第二引数に"true"を追加することでクエリパラメータとして
    //追加されている部分もパース処理される。
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname){

        case '/':
            response_index(request,response);
            break;
        
        case '/other':
            response_other(request,response);
            break;
        
        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end()
            break;

        
        default:
            response.writeHead(200, {'Contet-Type': 'text/html'});
            response.end('no page...')        
            break;
    }
}

var data = {msg: 'no message...'};

//Indexのアクセス処理
function response_index(request, response) {

    if (request.method='POST') {
        var body = '';

        //データ送信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        //受信終了イベント処理
        request.on('end', () =>{
            data = qs.parse(body);
            setCookie('msg', data.msg, response);
            write_index(request, response);
        });
    } else{
        write_index(request,response);
    }
}

//indexの表示
function write_index(request,response){
    var msg = "Messageの表示"
    var cookie_data = getCookie('msg',request);
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        cookie_data: cookie_data,
    })
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

function setCookie(key, value, response) {
    var cookie = escape(value);
    response.setHeader('Set-Cookie', [key + '=' + cookie]);
}

function getCookie(key, request) {
    var cookie_data = request.headers.cookie != undefined ?
        request.headers.cookie : '';
    var data = cookie_data.split(';');
    for (var i in data) {
        if (data[i].trim().startsWith(key + '=')) {
            var result = data[i].trim().substring(key.length + 1);
            return unescape(result);
        }
    }
    return '';
}

//otherのアクセス処理
//イベント処理：object.on(event, function);
function response_other(request, response) {
    var msg = "This is another page."
    
    //postアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        //データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        //データ受信終了のイベント処理
        request.on('end', () => {
            var post_data = qs.parse(body);//データのパース
            msg += 'You wrote "'+ post_data.msg +'".'
            var content = ejs.render(other_page, {
                title: "Other",
                content: msg,
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        });
        //GETアクセス時の処理
    } else {
        var msg = "no message"
        var content = ejs.render(other_page, {
            title: "Others",
            content: msg,
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
    }
}