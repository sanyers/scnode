
/**
 * file : redisdb.js
 * name : sanyer
 * describe : 连接redis缓存数据库
 * time : 2019-10-24
 */
require('lib');
require('../../dbconfig');
var redis = require('redis');
var config = coreServer.redis;//载入配置
var client = null;
var redisCount = 0;
initserver();
function initserver() {
    client = redis.createClient(redisConfig.rds_port, redisConfig.rds_host);
    client.on('connect', () => {
        client.auth(redisConfig.rds_pwd, (err) => {
            if (!err) {
                console.log('redis连接成功');
            }
        });
    });

    client.on('error', err => {
        console.log(err);
        redisCount++;
        if (redisCount > 10) {
            client.quit();
        }
    })
}

module.exports = function redisdb(options) {
    //查询key
    this.addrpc(`role:${config.name},cnd:getvalue`, (req, respond) => {
        let key = req.key;
        client.get(key, (err, r) => {
            if (err) {
                respond(null, httpReturn.error(err));
            } else {
                respond(null, httpReturn.success(r));
            }
        });
    });
}

seneca.use(config.name).listen(config.port);