# scnode

基于seneca构建分布式微服务Node.js框架

Building distributed microservice node.js framework based on Seneca

## 1、新建数据库scnode

./db/centerdb/data/scdb.sql

## 2、安装环境

### 安装modules库
npm install

### 安装pm2功能
npm install pm2@latest -g

## 3、启动核心服务

数据库连接服务
pm2 start ./db/centerdb/package.json

redis连接服务
pm2 start ./db/redisdb/package.json

远程过程调用服务
pm2 start ./rpc/package.json

主服务
pm2 start ./package.json

## 4、启动其他服务

测试服务
pm2 start ./list/test/package.json