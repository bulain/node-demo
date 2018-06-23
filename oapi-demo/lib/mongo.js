'use strict';
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = 'mongodb://localhost:27017';
const dbname = 'oapi';
const db = function () {
    if (global.mongo) return;
    return MongoClient.connect(url, {
        native_parser: false,
        poolSize: 50,
        noDelay: false,
        autoReconnect: true
    }).then(function (conn) {
        global.mongo = conn.db(dbname);
    }).catch(function (e) {
        console.log(e);
    });
};

const save = async (name, obj) => {
    await db();
    if (obj._id) obj._id = ObjectId(obj._id);
    return global.mongo.collection(name).save(obj);
};

const insertOrUpdate = async (name, obj) => {
    await db();
    if (obj._id) {
        obj._id = ObjectId(obj._id);
        return global.mongo.collection(name).updateOne({ "_id": obj._id }, { $set: obj });
    } else {
        return global.mongo.collection(name).insertOne(obj);
    }
};

const find = async (name, query, opt) => {
    await db();
    var q = global.mongo.collection(name).find(query);
    if (opt.skip) q = q.skip(opt.skip);
    if (opt.limit) q = q.limit(opt.limit);
    if (opt.sort) q = q.sort(opt.sort);
    return q.toArray();
};

const remove = async (name, obj) => {
    await db();
    if (obj._id) obj._id = ObjectId(obj._id);
    return global.mongo.collection(name).deleteOne(obj);
};

//模块导出
module.exports = {
    save: save,
    insertOrUpdate: insertOrUpdate,
    find: find,
    remove: remove
}