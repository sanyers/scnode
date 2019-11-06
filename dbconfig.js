global.dbConfig = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "123456",
    "database": "scdb",
    "backtime": 60 * 60 * 1000,//数据库备份间隔
    "backpath": "./db/centerdb/data/list/"//备份地址
}

global.redisConfig = {
    "rds_host": "127.0.0.1",
    "rds_port": 6379,
    "rds_pwd": "123456"
}