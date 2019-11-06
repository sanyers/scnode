seneca.client({
    port: coreServer.rpc.port,
    pin: 'role:' + coreServer.rpc.name,
    host: coreServer.rpc.host
});
seneca.addrpc = function (a, b) {
    seneca.add(a, (c, d) => {
        if (c.callpoint == undefined) {
            d(null, httpReturn.illegalError);
        } else {
            b(c, d);
        }
    });
}
global.callrpc = function (req, callback) {
    seneca.act(`role:rpc,cnd:call`, req, (err, r) => {
        if (err) {
            callback(httpReturn.serverError);
        } else {
            callback(r);
        }
    })
}