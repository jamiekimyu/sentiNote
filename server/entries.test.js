const request = require('supertest');
const {expect} = require('chai');
const chai = require('chai');
chai.use(require('chai-string'));
const app = require('./start');

describe('/api/entries', () => {

	it('gets entries by userId (GET /:user_id)', () => {
		request(app)
			.get(`/api/entries/1`)
			.expect(201);
	});

	it('gets entry by entryId (GET /:entry_id)', () => {
		request(app)
			.get(`/api/entries/entry/1`)
			.expect(201);
	});

	it('creates an entry', () => {
		request(app)
			.post(`/api/entries/`)
			.send({
				title: 'TEST ENTRY',
				content: 'This a a test entry'
			})
			.then(res => expect(res.body).to.contain({
				title: 'TEST ENTRY'
			}));
	});
});
