'use strict';
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = 'mongodb://localhost:27017';
const dbname = 'oapi';

let database = async function () {
    if (global._db) return global._db;
    try {
        let client = await MongoClient.connect(url, {
            native_parser: false,
            poolSize: 50,
            noDelay: false,
            autoReconnect: true
        });
        global._db = client.db(dbname);
    } catch (err) {
        console.log(err);
    }
    return global._db;
};

// 初始化数据库连接
database();

let save = async (name, obj) => {
    let db = await database();
    if (obj._id) obj._id = ObjectId(obj._id);
    return db.collection(name).save(obj);
};

let insertOrUpdate = async (name, obj) => {
    let db = await database();
    if (obj._id) {
        obj._id = ObjectId(obj._id);
        return db.collection(name).updateOne({ "_id": obj._id }, { $set: obj });
    } else {
        return db.collection(name).insertOne(obj);
    }
};

let find = async (name, query, opt) => {
    let db = await database();
    var q = db.collection(name).find(query);
    if (opt.skip) q = q.skip(opt.skip);
    if (opt.limit) q = q.limit(opt.limit);
    if (opt.sort) q = q.sort(opt.sort);
    return q.toArray();
};

let remove = async (name, obj) => {
    let db = await database();
    if (obj._id) obj._id = ObjectId(obj._id);
    return db.collection(name).deleteOne(obj);
};

//模块导出
module.exports = {
    save: save,
    insertOrUpdate: insertOrUpdate,
    find: find,
    remove: remove
}