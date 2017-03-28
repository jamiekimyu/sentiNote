const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedEntries = () => db.Promise.map([
  {title: "Joy!", content: "I'm really happy. Life is great. I feel so wonderful. I am really joyous right now. I am sublime. Jim is stoked. Peggy is happy. Tom is glad. They are content.", user_id:2},
  {title: "Sad!", content: "Today I feel sad. I am so depressed. Woe was me. Life is bad. Jim feels miserable. Peggy has the blues. The thrill is gone. I am not happy.", user_id:2},
  {title: "Trust!", content: "I really believe you. I have confidence in you.  Jim has faith in Jill. I know you will honor your commitment. I know you are reliable.", user_id:2},
  {title: "Anticipation!", content: "I can't wait. This is going to be great. I am excited for that to happen. I hope it works out. It will be great when that happens.", user_id:2},
  {title: "Fear!", content: "I'm scared. I am nervous. This is dangerous. We could die. I'm shaking in my boots. Suzy is frightened.", user_id:1},
  {title: "Surprise!", content: "Oh wow! That really shocked me. Tom didn't expect that. That was a revelation. What an eye-opener!", user_id:1},
  {title: "Anger!", content: "I'm fucking pissed! Bobby was mad as hell. Anger overtook him. He was raging against the machine. To say she was irate is an understatement", user_id:1},
  {title: "Disgust!", content: "That is grotesque. What a filthy animal! That is making me sick. That is so revulsive. Yolanda detests Sarah.", user_id:1}
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
