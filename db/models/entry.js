const Sequelize = require('sequelize');
const db = require('APP/db');

const Entry = db.define('entries', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	sent: {
		type: Sequelize.JSON
	},
	emotion: {
		type: Sequelize.JSON
	}
})

module.exports = Entry;
