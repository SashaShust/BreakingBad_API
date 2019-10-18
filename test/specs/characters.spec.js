const axios = require('axios');
const {expect} = require('chai');
const testData = require('../test_data/characters.json');

describe('Breaking bad character api', function () {

    it('Should return a character object when provided with a character ID', async function () {
        const characterID = testData[0].characterID;
        const expectedResponse = testData[0].expectedResponse;
        const requestParameters = {
            method: `GET`,
            url: `https://www.breakingbadapi.com/api/characters/${characterID}`,
            headers: {
                "Content-Type": "application/json"
            },
            json: true
        };

        const response = await axios(requestParameters);

        expect(response.data[0].char_id).to.be.equal(expectedResponse.char_id);
        expect(response.data[0].name).to.be.equal(expectedResponse.name);
        expect(response.data[0].appearance).to.be.an('array');
        expect(response.data).to.be.an('array');
        expect(JSON.stringify(response.data[0], null, null)).to.be.equal(JSON.stringify(expectedResponse, null, null));
    });

    it('Should return a character object when provided with params "limit" and "offset"', async function () {
        const limit = testData[1].limitParameter;
        const offset = testData[1].offsetParameter;
        const expectedResponse = testData[1].expectedResponse;
        const requestParameters = {
            method: `GET`,
            url: `https://www.breakingbadapi.com/api/characters/?limit=${limit}&offset=${offset}`,
            headers: {
                "Content-Type": "application/json"
            },
            json: true
        };

        const response = await axios(requestParameters);

        expect(response.data).to.be.an('array');
        expect(response.data.length).to.be.equal(+limit);
        expect(JSON.stringify(response.data, null, null)).to.be.equal(JSON.stringify(expectedResponse, null, null));
    });

    it('Should return all characters when provided with a character', async function () {
        const expectedResponse = testData[2].expectedResponse;
        const requestParameters = {
            method: `GET`,
            url: `https://www.breakingbadapi.com/api/characters`,
            headers: {
                "Content-Type": "application/json"
            },
            json: true
        };

        const response = await axios(requestParameters);
        
        expect(JSON.stringify(response.data)).to.be.equal(JSON.stringify(expectedResponse));
    });
});