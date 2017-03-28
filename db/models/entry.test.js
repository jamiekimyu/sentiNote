const request = require('supertest')
const db = require('APP/db');
const {expect} = require('chai');
const Entry = require('./entry').Entry;

describe('Entry Model', () => {
	beforeEach(function(done){
		Entry.sync({force: true})
				 .then(() => Entry.sync({force: true}))
				 .then(done)
				 .catch(done);
	});
});
