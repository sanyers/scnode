seneca.client({
    port: coreServer.db.port,
    pin: 'role:' + coreServer.db.name,
    host: coreServer.db.host
});
global.dbControl = {
    queryData: (req, callback) => {
        req.callpoint = `role:${coreServer.db.name},cnd:queryData`;
        callrpc(req, (r) => {
            callback(r);
        });
    }
}