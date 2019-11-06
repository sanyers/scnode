
/**
 * file : rpc.js
 * name : sanyer
 * describe : 远程过程调用
 * time : 2019-08-12
 */
require('lib');
var fs = require("fs");
var config = coreServer.rpc;//载入配置
initserver();
function initserver() {
    let param = {
        sql: 'select * from modlist',
        callpoint: '1'
    }
    seneca.act(`role:${coreServer.db.name},cnd:queryData`, param, (err, data) => {
        if (!err) {
            data.forEach(element => {
                seneca.client({
                    host: element.host,
                    port: element.port,
                    pin: 'role:' + element.rpc
                });
            });
        }
    })
    // dbControl.queryData({ sql: 'select * from modlist' }, (err, data) => {
    //     console.log(err, data)
    // })
    //let modlist = fs.readdirSync('./modlist/');
    //自动注册服务节点
    // modlist.forEach(element => {
    //     let callpoint = element.split('.');
    //     seneca.client({
    //         //host: '127.0.0.1',
    //         port: callpoint[1],
    //         pin: 'role:' + callpoint[0]
    //     });
    // });

    // //注册redis
    // seneca.client({
    //     //host: '127.0.0.1',
    //     port: 7201,
    //     pin: 'role:redisn'
    // });
}

module.exports = function prc(options) {
    //远程调用
    this.addrpc(`role:${config.name},cnd:call`, (options, callback) => {
        seneca.act(options.callpoint, options, callback);
    });

    //关闭服务节点
    this.addrpc(`role:${config.name},cnd:close`, (options, callback) => {
        seneca.close({
            port: options.port,
            pin: 'role:' + options.callname
        });
        callback(null, httpReturn.successOK);
    });

    //注册服务节点
    this.addrpc(`role:${config.name},cnd:register`, (options, callback) => {
        seneca.client({
            host: options.host,
            port: options.port,
            pin: 'role:' + options.callname
        });
    });
}

seneca.use(config.name).listen(config.port);