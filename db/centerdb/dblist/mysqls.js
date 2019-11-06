const mysql = require('mysql');
const async = require('async');
const exec = require('child_process').exec;
const fs = require('fs');
var SqlDB = {};
SqlDB.insertData = function (sqlStr, callback) {
    queryAll(sqlStr, callback);
};

SqlDB.queryData = function (sqlStr, callback) {
    queryAll(sqlStr, callback);
};

SqlDB.executeSql = function (sqlStr, callback) {
    queryAll(sqlStr, callback);
};

//备份mysql
SqlDB.backmysql = function (fileName, database, callback) {
    let host = dbConfig.host;
    let user = dbConfig.user;
    let password = dbConfig.password;
    exec('mysqldump -h' + host + ' -u' + user + ' -p' + password + ' ' + database + ' > ' + fileName, function (err, stdout, stderr) {
        if (err) {
            console.log('备份数据库错误:' + err);
            callback({
                code: 0,
                msg: '还原数据库失败'
            });
        } else {
            console.log('备份' + database + '数据库成功');
            callback({
                code: 1,
                msg: '备份' + database + '数据库成功'
            });
        }
    });
};

//还原mysql
SqlDB.redumysql = function (option, callback) {
    let { time, database } = option;
    let host = dbConfig.host;
    let user = dbConfig.user;
    let password = dbConfig.password;
    let times = new Date(time).format('yyyy-MM-dd hh:mm:ss').split(' ');
    let fileName = './mods/db/data/' + times[0] + '/' + database + '_' + times[1].replace(/:/g, '_') + '.sql';
    exec('mysql -h' + host + ' -u' + user + ' -p' + password + ' ' + database + ' < ' + fileName, function (err, stdout, stderr) {
        if (err) {
            console.log('还原数据库错误:' + stderr);
            callback({
                code: 0,
                msg: '还原数据库失败'
            })
        } else {
            console.log('还原' + database + '数据库成功');
            callback({
                code: 1,
                msg: '还原' + database + '数据库成功'
            })
        }
    });
};
//格式化时间
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//自动备份数据库
setInterval(function () {
    let time = new Date().format('yyyy-MM-dd hh:mm:ss').split(' ');
    let dbname1 = dbConfig.database;
    let path = dbConfig.backpath;
    dirExits(path, (dd) => {
        dirExits(path + time[0], (dd) => {
            SqlDB.backmysql(path + time[0] + '/' + dbname1 + '_' + time[1].replace(/:/g, '_') + '.sql', dbname1, () => { });
        });
    });
}, dbConfig.backtime);

function dirExits(dir, callback) {
    fs.exists(dir, (exists) => {
        if (exists) {
            callback(true);
        } else {
            fs.mkdir(dir, err => {
                if (err) {
                    callback(false);
                } else {
                    callback(true);
                }
            })
        }
    });
}

function queryAll(sqlStr, callback) {
    let pool = mysql.createPool(dbConfig);
    pool.getConnection(function (err, connection) {
        if (err) {
            let nullrow = [];
            pool.end();
            console.error(err.message);
            callback(nullrow, err.message);
        } else {
            sqlStr = sqlStr.replace(/\u005b/g, '`').replace(/\u005d/g, '`');//替换所有[]为`
            pool.query(sqlStr, function (err, rows, fields) {
                if (err) {
                    let nullrow = [];
                    pool.end();
                    console.error(err.message);
                    callback(nullrow, err.message);
                } else {
                    pool.end();
                    callback(rows);
                }
            });
        }
    });
}


/**
 * 带参数的sql执行方法
 * @param {*} sqlStr 
 * @param {*} parm 
 * @param {*} callback 
 */
SqlDB.executeSqlParm = function (sqlStr, parm, callback) {
    queryAllParm(sqlStr, parm, callback);
};

function queryAllParm(sqlStr, parm, callback) {
    let pool = mysql.createPool(config.config_mysql);
    pool.getConnection(function (err, connection) {
        if (err) {
            let nullrow = [];
            pool.end();
            console.error(err.message);
            callback(nullrow, err.message);
        } else {
            sqlStr = sqlStr.replace(/\u005b/g, '`').replace(/\u005d/g, '`');//替换所有[]为`
            pool.query(sqlStr, parm, function (err, rows, fields) {
                if (err) {
                    let nullrow = [];
                    pool.end();
                    console.error(err.message);
                    callback(nullrow, err.message);
                } else {
                    pool.end();
                    callback(rows);
                }
            });
        }
    });
}

/**
   * 带参数的具有事务的sql执行方法
   * @param {*} sqlparamsEntities 
   * @param {*} callback 
   */
SqlDB.executeSqlTrans = function (sqlparamsEntities, callback) {
    executeSqlTrans(sqlparamsEntities, callback);
};
function executeSqlTrans(sqlparamsEntities, callback) {
    let pool = mysql.createPool(dbConfig);
    pool.getConnection(function (err, connection) {
        if (err) {
            let nullrow = [];
            pool.end();
            console.error(err.message);
            callback(nullrow, err.message);
        }
        connection.beginTransaction(function (transcErr) {
            if (transcErr) {
                let nullrow = [];
                pool.end();
                console.error(transcErr.message);
                callback(nullrow, transcErr.message);
            }
            console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
            var funcAry = [];
            sqlparamsEntities.forEach(function (sql_param) {
                var temp = function (cb) {
                    var sql = sql_param.sql;
                    var param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                console.log("事务失败，" + sql_param + "，ERROR：" + tErr);
                                //throw tErr;
                                let nullrow = [];
                                pool.end();
                                console.error(tErr.message);
                                callback(nullrow, tErr.message);
                            });
                        } else {
                            return cb(null, 'ok');
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (err, result) {
                console.log("transaction error: " + err);
                if (err) {
                    connection.rollback(function (err) {
                        console.log("transaction error: " + err);
                        connection.release();
                        let nullrow = [];
                        pool.end();
                        console.error(err.message);
                        callback(nullrow, err.message);
                    });
                } else {
                    connection.commit(function (err, info) {
                        console.log("transaction info: " + JSON.stringify(info));
                        if (err) {
                            console.log("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                console.log("transaction error: " + err);
                                connection.release();
                                let nullrow = [];
                                pool.end();
                                console.error(err.message);
                                callback(nullrow, err.message);
                            });
                        } else {
                            connection.release();
                            pool.end();
                            let nullrow = [];
                            nullrow.push('success');
                            callback(nullrow, info);
                        }
                    })
                }
            })
        });
    });
}

exports.SqlDB = SqlDB;