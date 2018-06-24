var assert = require('assert')
var mongo = require('../lib/mongo');

before(async function () {
    await mongo.setup();
});

after(async function () {
    await mongo.shutdown();
});

describe('mongo', function () {
    describe('#save()', function () {
        it('should work', async function () {
            await mongo.save('users', { 'name': 'abc' })
        })
    })
})
