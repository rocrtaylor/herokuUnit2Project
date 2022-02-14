//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require('mongoose');
const Monster = require('./models/monsters.js')
const perm = require('./models/monstersPerm.js')
const methodOverride  = require('method-override');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________

//new 1
app.get('/monsters/new', (req, res) => {
  res.render('new.ejs')
})


//put 7
app.put('/monsters/:id', (req, res) => {
  Monster.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
      res.redirect('/monsters')
  })
})


//edit 6
app.get('/monsters/:id/edit', (req, res) => {
  Monster.findById(req.params.id, (err, foundMonster) => {
      res.render('edit.ejs', {
          monster: foundMonster
      })
  })
})


//delete 5
app.delete('/monsters/:id', (req, res) => {
  Monster.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/monsters')
  })
})

//show 4
app.get('/monsters/:id', (req, res) => {
  Monster.findById(req.params.id, (error, foundMonster) => {
      res.render('show.ejs', {
          monster: foundMonster
      })
  })
})


//index 3
app.get('/monsters', (req, res) => {
  Monster.find({}, (error, allMonsters) => {
      res.render('index.ejs', {
        monster: allMonsters,
        roc:perm
      })
  })
  
})


// create 2
app.post('/monsters/', (req, res) => {
  Monster.create(req.body, (error, createdMonster) => {
      res.redirect('/monsters')
  })
  
})



//localhost:3000
app.get('/', (req, res) => {
  res.redirect('/monsters')
  // res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
