global.coreServer = {
    main: {//主服务，网关代理
        port: 3100
    },
    db: {//数据库连接
        name: 'centerdb',
        port: 7200,
        host: '127.0.0.1'
    },
    redis: {//redis配置
        name: 'redisdb',
        port: 7201,
        host: '127.0.0.1'
    },
    rpc: {//rpc配置
        name: 'rpc',
        port: 7202,
        host: '127.0.0.1'
    }
}