const axios = require('axios');
const {expect} = require('chai');
const testData = require('../test_data/characters.json');

describe('Breaking bad all character api', async () => {

    let response;
    const expectedRespons = testData[2].expectedResponse;

    before(async () => {
        const requestParameters = {
            method: 'GET',
            url: 'https://www.breakingbadapi.com/api/characters',
            json: true
        };
        response = await axios(requestParameters);
    });

    expectedRespons.forEach((arg, index) => {
        it(`should check data for character`, () => {
            expect(response.data[index].char_id).to.be.equal(arg.char_id);
            expect(...response.data[index].occupation).to.be.equal(...arg.occupation);
            expect(...response.data[index].better_call_saul_appearance).to.be.equal(...arg.better_call_saul_appearance);
        });
    });
});