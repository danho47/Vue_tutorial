//テンプレートエンジン
const http = require('http')
const fs = require('fs')
//ejsオブジェクト読み込み
const ejs = require('ejs');
const url = require('url')

//テンプレートファイル読み込み
//readFile: 非同期処理。ファイル読み込み終わってなくても次の処理。
//読み込み終わったらコールバック処理であとの処理に回す。
//readFileSync: 同期処理。ファイル読み込んでから次に進む。
const index_page = fs.readFileSync('./ch2_3_index.ejs','utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');
const othe_page = fs.readFileSync('./other.ejs','utf-8');

var server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!');

function getFromClient(request, response){
    var url_parts = url.parse(request.url);
    switch (url_parts.pathname){
        case '/':
            //レンタリングの実行。HTMLのソースコードに変換
            //ejs.render(レンタリングするデータ, オブジェクト)
            var content = ejs.render(index_page, {
                title: "Index page",
                content: "This is a sample page using a template."
            });
            response.writeHead(200, {'Contet-Type': 'text/html'});
            response.write(content);
            response.end()
            break;
        
        case '/other':
            var content = ejs.render(index_page, {
                title: "Other page",
                content: "This is a new page."
            });
            response.writeHead(200, {'Contet-Type': 'text/html'});
            response.write(content);
            response.end()
            break;
            
        // case '/style.css':
        //     response.writeHead(200, {'Contet-Type': 'text/html'});
        //     response.write(style_css);
        //     response.end();
        //     break;
        
        default:
            response.writeHead(200, {'Contet-Type': 'text/html'});
            response.end('no page...')        
            break;
    }
}