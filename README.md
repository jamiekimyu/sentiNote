# SentiMentum
    
SentiMentum is a sentiment analysis dashboard application that helps users visualize their emotions over time. Users are encouraged to express their thoughts and feelings on SentiMentum's journal. SentiMentum will then analyze the journal entries and output a visual representation of the user's emotions and sentiments(ranging from postivity to negativity). Our application can not only analyze a user’s journal entries, but it can also analyze their tweets, as well as favorite songs or movies to give further insight into the type of media they are consuming. 

Beyond self-introspection, the user can also use SentiMentum to analyze the emotions of other users on twitter, the twitterverse-at-large on a particular search term, or whatever song or movie they choose. Particularly, we encourage users to conduct a side-by-side comparison between a person's twitter feed and what the twitterverse at-large feels about that person at that particular moment(ie compare the emotions of Oprah's twitter handle to how other twitter user's feel about her)

Users will not only be able to see how their emotions change over time but also be able to use the Machine Learning feature of our application to teach SentiMentum how to better predict emotions. 

The deployed application is located at: 
sentimentum.info

To see sample journal entries and the accompanying user dashboard you can log in with:

Email: emmet@lego.com  
Password: 1234 

## Getting Started
  
Follow these steps to get the app and backend running on your machine.

### Prerequisites
  
This guide assumes that you have Node (and npm) and PostgreSQL installed for the backend. 
  
If you don't have the prerequisites, you can get them here: 
  
https://nodejs.org
  
https://www.postgresql.org/
  
### Installing 
  
```
git clone https://github.com/jamiekimyu/sentinote
```

Make sure PostgreSQL is running and in your project directory, run
  
```
npm install
```
  
To seed the database
  
```
npm run seed
```
  
Then to start the server, run
  
```
npm start
```
  
and connect to localhost:1337.
  
You can log in with:  
  
Email: emmet@lego.com 
Password: 1234

## Running the tests
  
Our test suite features testing for the routing, database, API, and frontend. 
  
On the backend we test Express, our database models, and our Twitter API behavior. 

On the frontend, we test our React components and Redux store for expected behavior, as well as the specific actions of our libraries and modules.

All tests are run via
  
```
npm test
```
  
## Authors

* **Andrew Basore** - [GitHub](https://github.com/AndrewBasore)
* **Alan Campbell** - [GitHub](https://github.com/acampbell4444)
* **Jamie Yu** - [GitHub](https://github.com/jamiekimyu)
* **Kim Winston-Jackson** - [GitHub](https://github.com/klwjack)