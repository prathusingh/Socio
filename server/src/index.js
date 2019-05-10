import express from 'express';
import bodyParser from 'body-parser';
const MongoClient = require('mongodb').MongoClient;
import passport from 'passport';
import db from './config/keys';
import users from './routes/api/users';
import tokenAuthentication from './config/passport';
import cors from 'cors';

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use cors
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// Connect to db
const dbUrI = process.env.NODE_ENV === 'dev' ? db.mongoURI : db.mongoURIProd;
const client = new MongoClient(dbUrI, {
  useNewUrlParser: true
});
client.connect(
  () => {
    console.log('DB connected');
  },
  err => {
    console.log(err);
  }
);

// Passport middleware
app.use(passport.initialize());

// Passport Config
tokenAuthentication(passport);

app.use('/api/users', users);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on ${port}`));
