'use strict';
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

var opt = {
    "host": "localhost",
    "port": "6379"
};
var client = null;

//创建连接池
var setup = () => {
    if (client) return client;
    client = redis.createClient(opt);
    client.on("error", function (err) {
        console.log(err);
    });
    if (opt.password) client.auth(opt.password);
    return client;
};

//关闭连接池
var shutdown = () => {
    client.end(true);
    client.quit();
    client = null;
};

//模块导出
module.exports = {
    setup: setup,
    shutdown: shutdown
}