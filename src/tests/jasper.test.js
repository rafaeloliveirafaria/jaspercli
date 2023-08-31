// create unit tests for src/model/index.js
const { describe, it } = require('node:test');
const assert = require('node:assert');

const model = require('../model');

describe('jasperFile', () => {
    it('jasperFile is a function', () => {
        assert.strictEqual(typeof model.jasperFile, 'function');
    });
    test('jasperFile returns a promise', () => {
        const file = '/jasperserver/rest_v2/reports/reports/dashboard_exportGroup'
        const type = 'xls'
        const params = {
                "ignorePagination":true,
                "onePagePerSheet":false,
                "p_store_id":"93",
                "p_team_id":"",
                "p_user_id":"",
                "dateB":"2023-08-01",
                "dateD":"2023-08-31"
        }
        expect(model.jasperFile(
            file,
            type,
            params
        )).toBeInstanceOf(Promise);
    });
    // test('jasperFile returns a promise that resolves to a string', async () => {
    //     const result = await jasperFile();
    //     expect(typeof result).toEqual('string');
    // });
});

