const Sequelize = require('sequelize');
const db = require('APP/db');

const TeachDoc = db.define('teachDocs', {
	anticipation: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	},
	fear: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	},
	joy: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	},
	sadness: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	},
	surprise: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	},
	anger: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	},
	disgust: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	},
	trust: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
		defaultValue: []
	}
})

module.exports = TeachDoc;
