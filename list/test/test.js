/**
 * file : /list/test/test.js
 * name : sanyer
 * version : 1.0.0
 * describe : 测试接口
 * time : 2019-10-21
 */
require('lib');
let config = {
    name: 'test',
    port: 3101
}
module.exports = function test(options) {
    //请求加法计算
    this.addrpc(`role:${config.name},cmd:add`, (req, respond) => {
        try {
            let a = req.body.a;
            let b = req.body.b;
            let c = parseInt(a) + parseInt(b);
            respond(null, httpReturn.success(c));
        } catch (e) {
            respond(null, httpReturn.error(111));
        }
    });

    //获取redis数据
    this.addrpc(`role:${config.name},cmd:data`, (req, respond) => {
        let reqs = {
            key: 'mykey1'
        }
        callredis.getvalue(reqs, (r) => {
            respond(null, r);
        });
    });

    this.addrpc(`role:${config.name},cmd:gets`, (req, respond) => {
        let c = seneca.version;
        respond(null, httpReturn.success(c));
    });
}

seneca.use(config.name).listen(config.port);