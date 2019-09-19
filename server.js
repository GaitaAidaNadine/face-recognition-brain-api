const express = require('express');
const bodyParser = require('body-parser');//allow to parse the body of the request
const bcrypt = require('bcrypt');
const cors = require('cors');//allow front-end to connect with the server->server is trustful
const knex = require('knex');
const saltRounds = 10;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //ip address for localhost
      user : 'postgres',
      password : 'Matematica22',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{ res.json('it is working!') })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)} )
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3001, ()=>{
    console.log('app is running on port 3001');
})

/*

    / --> res = all users
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT = user

 */