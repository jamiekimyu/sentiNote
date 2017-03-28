const request = require('supertest');
const {expect} = require('chai');
const chai = require('chai');
chai.use(require('chai-string'));
const app = require('./start');

describe('/api/movies', () => {

	it('gets response for movies', (done) => {
		request(app)
			.get('/api/movies/linksAndTitles')
			.expect(200, done);
	});

	it('gets movies list', function(done) {
		request(app)
			.get('/api/movies/linksAndTitles')
			.then((response) => {
				expect(response.body.length).to.be.gt(0);
				done();
			});
	});

	it('movie list contains movies with titles and links', function(done) {
		request(app)
			.get('/api/movies/linksAndTitles')
			.then((response) => {
				expect(response.body[0].title).to.be.a('string');
				let title = response.body[0].title.replace(/\s+/g, '-');
				expect(response.body[0].link).to.be.a('string');
				expect(response.body[0].link).to.startsWith('http://www.imsdb.com/scripts/');
				expect(response.body[0].link).to.endsWith(title + '.html');
				done();
			});
	});

	it('posts a movie script', function(done) {
		request(app)
			.post('/api/movies/scripts')
			.send({scriptLink: 'http://www.imsdb.com/scripts/10-Things-I-Hate-About-You.html'})
			.then((response) => {
				expect(response.body.text).to.be.a('string');
				done();
			});
	});
});
