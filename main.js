/**
 * file : main.js
 * name : sanyer
 * describe : 基于seneca构建分布式微服务Node.js框架。
 *   Building distributed microservice node.js framework based on Seneca
 * time : 2019-10-21
 */
require('lib');
let config = coreServer.main;
var express = require('express');//web框架
var bodyParser = require('body-parser');
global.app = express();//web框架初始化

var multipart = require('connect-multiparty');
global.multipartMiddleware = multipart();
app.use(multipartMiddleware);
app.use(bodyParser.json({ limit: '50mb' }));//解析application/json参数
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));//解析www-form-urlencoded参数
//app.use("/", express.static("public"));//开放public文件夹目录

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(httpReturn.runError);
});

app.all("*", function (req, res, next) {
    let urls = req.originalUrl.split('/');
    if (urls[1] == 'api' && urls[2] != undefined && urls[2] != null) {
        let role = urls[2];
        let cmd = req.originalUrl.replace('/' + urls[1] + '/' + urls[2] + '/', '');
        exec_seneca(role, cmd, req, res);
    } else {
        next();
    }
});

function exec_seneca(role, cmd, req, res) {
    let reqs = {
        body: req.body,
        callpoint: `role:${role},cmd:${cmd}`
    }
    callrpc(reqs, (r) => {
        res.json(r);
    });
    // seneca.act(`role:rpc,cnd:call`, reqs, (err, r) => {
    //     if (err) {
    //         res.json(httpReturn.serverError);
    //     } else {
    //         res.json(r);
    //     }
    // })
}

//启动应用程序
app.listen(config.port, function () {
    console.log('http listening on ' + config.port + ', pid:' + process.pid);
});