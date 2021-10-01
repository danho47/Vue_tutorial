//テンプレートエンジン
const http = require('http')
const fs = require('fs')
//ejsオブジェクト読み込み
const ejs = require('ejs');

const { listenerCount } = require('process');

//テンプレートファイル読み込み
//readFile: 非同期処理。ファイル読み込み終わってなくても次の処理。
//読み込み終わったらコールバック処理であとの処理に回す。
//readFileSync: 同期処理。ファイル読み込んでから次に進む。
const index_page = fs.readFileSync('./ch2_3_index.ejs','utf8');

var server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!');

function getFromClient(request, response){
    //レンタリングの実行。HTMLのソースコードに変換
    //ejs.render(レンタリングするデータ, オブジェクト)
    var content = ejs.render(index_page, {
        title: "Index page",
        content: "This is a sample page using a template."
    });
    response.writeHead(200, {'Contet-Type': 'text/html'});
    response.write(content);
    response.end()
}