const request = require('supertest');
const {expect} = require('chai');
const app = require('./start');

//app.listen(3000, () => {
	describe('/api/twitter', () => {
		it('get tweets for user', (done) => {
			request(app)
				.get('/api/twitter/user/minddelver')
				.expect(200, done);
		});

		it('fetch correct tweet data for user', function(done) {
			request(app)
				.get('/api/twitter/user/minddelver')
				.then((response) => {
					expect(response.body.length).to.equal(11);
					done();
				});
		});

		it('get tweets for search term', (done) => {
			request(app)
				.get('/api/twitter/search/love')
				.expect(200, done);
		});

		it('gets response for searching twitter term', function(done) {
			request(app)
				.get('/api/twitter/search/love')
				.then((response) => {
					expect(response.body.length).not.to.equal(0);
					done();
				});
		});

		it('get tweets for complete user history', (done) => {
			request(app)
				.get('/api/twitter/history/minddelver/16')
				.expect(200, done);
		});

		it('gets appropriate number of tweets given a page count', function(done) {
			request(app)
				.get('/api/twitter/history/oprah/3')
				.then((response) => {
					expect(response.body.length).to.be.gt(502);
					done();
				});
		});
	});

//});
