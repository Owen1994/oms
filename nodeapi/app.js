/**
*作者: 任贸华
*功能描述: nodeapi接口文件
*参数说明:
*时间: 2018/4/16 12:05
*/
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')


const index = require('./routers/index')

const app = express()
const port = process.env.PORT || 3333

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'dist')));//指向编译后的HTML文件目录

//配置允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    var ticket = req.headers['ticket'];
    if (!ticket) {
        res.json({"state": "000002", "msg": "用户未登录"});
    } else {
        next();
    }
});

app.use('/urc', index);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app