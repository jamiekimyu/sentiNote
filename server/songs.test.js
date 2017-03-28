const request = require('supertest');
const {expect} = require('chai');
const chai = require('chai');
chai.use(require('chai-string'));
const app = require('./start');

describe('/api/songs', () => {

	it('gets response for song', (done) => {
		request(app)
			.post('/api/songs')
			.then((response) => {
				expect(200);
				expect(response.text).to.equal('Sorry, We don\'t have lyrics for this song yet.');
				done();
			});

	});

	it('gets correct lyrics for a song', function(done) {
		request(app)
			.post('/api/songs')
			.send({song_artist: 'Whitney Houston', song_title: 'I Will Always Love You'})
			.then((response) => {
				expect(response.text).to.be.a('string');
				expect(response.text).to.startsWith('\nIf I should stay');
				done();
			});
	});
});
