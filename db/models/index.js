'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const OAuth = require('./oauth')
const Entry = require('./entry');
const TeachDoc = require('./teachDoc');


OAuth.belongsTo(User)
User.hasOne(OAuth)

Entry.belongsTo(User);
User.hasMany(Entry);
User.hasOne(TeachDoc)

module.exports = {User, Entry}
