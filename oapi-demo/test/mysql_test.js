const assert = require('assert')
const mysql = require('../lib/mysql');

before(async function () {
    await mysql.setup();
});

after(async function () {
    await mysql.shutdown();
});

describe('mysql', function () {
    describe('#row()', function () {
        it('should work', async function () {
            await mysql.execute('insert into users (name) values(\'abc\')');
            await mysql.row('select * from users');
        })
    })
})