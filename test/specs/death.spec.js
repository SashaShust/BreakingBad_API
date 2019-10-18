const axios = require('axios');
const {expect} = require('chai');
const testData = require('../test_data/deaths.json');

describe('Breaking bad deaths api', async () => {

    let response;
    const expectedResponse = testData[0].expectedResponse;

    before(async () => {
        const requestParameters = {
            method: `GET`,
            url: `https://www.breakingbadapi.com/api/deaths`,
            headers: {
                "Content-Type": "application/json"
            },
            json: true
        };
        response = await axios(requestParameters);
    });

    expectedResponse.forEach((dataElem, i) => {
        it('Should return a character object when provided with a character ID', async function () {
            expect(response.data[i].death_id).to.be.equal(dataElem.death_id);
            expect(response.data[i].responsible).to.be.equal(dataElem.responsible);
            expect(response.data[i].cause).to.be.equal(dataElem.cause);
        });
    });
});