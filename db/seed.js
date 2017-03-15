const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedEntries = () => db.Promise.map([
	{title: "My 1st Entry!", content: "I'm doing super awesome today", user_id:1}
], entry => db.model('entries').create(entry))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => {
    console.log(`Seeded ${users.length} users OK`)
  })
  .then(seedEntries)
  .then(entries => console.log(`Seeded ${entries.length} entries OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
