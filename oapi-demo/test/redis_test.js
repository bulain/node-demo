const assert = require('assert')
const redis = require('../lib/redis');

var client = null;

before(function () {
    client = redis.setup();
});

after(function () {
    redis.shutdown();
});

describe('redis', function () {
    describe('#set & get()', function () {
        it('should work', async function () {
            client.set('k1', 'v1');
            var v = await client.getAsync('k1');
            assert.equal(v, 'v1');
        });
    })
    describe('#hset & hget()', function () {
        it('should work', async function () {
            client.hset('hk1', 'k1', 'v1');
            var v = await client.hgetAsync('hk1', 'k1');
            assert.equal(v, 'v1');
        });
    })
})