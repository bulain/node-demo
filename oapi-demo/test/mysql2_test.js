const assert = require('assert')
const mysql = require('../lib/mysql2');

before(async function () {
    await mysql.setup();
});

after(async function () {
    await mysql.shutdown();
});

describe('mysql2', function () {
    describe('#execute() & row()', function () {
        it('should work', async function () {
            await mysql.execute('insert into users (name) values(\'abc\')');
            await mysql.row('select * from users');
        })
    })
})