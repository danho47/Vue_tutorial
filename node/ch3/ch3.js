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
const index_page = fs.readFileSync('./ch3_index.ejs','utf8');
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

        // case '/':
        //     //レンタリングの実行。HTMLのソースコードに変換
        //     //ejs.render(レンタリングするデータ, オブジェクト)
        //     var content = "This is a index page."
        //     //"query"にパースされたクエリパラメータのオブジェクトを保管
        //     var query = url_parts.query;
        //     if (query.msg != undefined){
        //         content += 'You send "'+ query.msg +'".';
        //     }
        //     var content = ejs.render(index_page, {
        //         title: "Index",
        //         content: content,
        //     });
            
        //     response.writeHead(200, {'Contet-Type': 'text/html'});
        //     response.write(content);
        //     response.end()
        //     break;
        
        default:
            response.writeHead(200, {'Contet-Type': 'text/html'});
            response.end('no page...')        
            break;
    }
}

var data = {
    'Taro': '09-999-999',
    'Hanako':'080-888-888',
    'Sachiko':'070-777-777',
    'Ichiro':'060-666-666'
}

var data2 ={
    'Taro': ['taro@yamada','09-999-999','Tokyo'],
    'Hanako': ['hanako@flower','080-888-888','Yokohama'],
    'Sachiko': ['sachi@happy','070-777-777','Nagoya'],
    'Ichiro':['ichi@baseball','060-666-666','USA'],
}

//Indexのアクセス処理
function response_index(request, response) {
    var msg = "This is a index page."
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        filename: 'data_item',
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
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