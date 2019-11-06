/**
 * file : centerdb.js
 * name : sanyer
 * version : 1.0.0
 * describe : 数据库连接服务
 * time : 2019-03-10
 */
require('lib');
require('../../dbconfig');
var config = coreServer.db;//载入配置
var dbControl = require('./dblist/mysqls').SqlDB;
module.exports = function centerdb(options) {
    this.addrpc(`role:${config.name},cnd:queryData`, (param, respond) => {
        dbControl.queryData(param.sql, function (result) {
            respond(result);
        });
    })

    this.addrpc(`role:${config.name},cnd:insertData`, (param, respond) => {
        dbControl.insertData(param.sql, function (result) {
            respond(result);
        });
    })

    this.addrpc(`role:${config.name},cnd:redumysql`, (param, respond) => {
        dbControl.redumysql(param, function (result) {
            respond(result);
        });
    })

    this.addrpc(`role:${config.name},cnd:executeSql`, (param, respond) => {
        dbControl.executeSql(param.sql, function (result) {
            respond(result);
        });
    })

    this.addrpc(`role:${config.name},cnd:executeSqlParm`, (param, respond) => {
        dbControl.executeSqlParm(param.sql, param.paramArr, function (result) {
            respond(result);
        });
    })

    this.addrpc(`role:${config.name},cnd:executeSqlTrans`, (param, respond) => {
        dbControl.executeSqlTrans(param.enityArr, function (result) {
            respond(result);
        });
    })
}

seneca.use(config.name).listen(config.port);