seneca.client({
    port: coreServer.redis.port,
    pin: 'role:' + coreServer.redis.name,
    host: coreServer.redis.host
});
global.callredis = {
    getvalue: (req, callback) => {
        req.callpoint = `role:${coreServer.redis.name},cnd:getvalue`;
        callrpc(req, (r) => {
            callback(r);
        });
    }
}