const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedJournals = () => db.Promise.map([
	{title: "My Journal", user_id:1}
], journal => db.model('journals').create(journal))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => {
    console.log(`Seeded ${users.length} users OK`)
  })
  .then(seedJournals)
  .then(journals => console.log(`Seeded ${journals.length} journals OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
