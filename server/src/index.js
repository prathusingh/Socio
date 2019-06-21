import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import db from './config/keys';
import users from './routes/api/users';
import tokenAuthentication from './config/passport';
import cors from 'cors';
import path from 'path';

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
console.log(dbUrI);

mongoose
  .connect(dbUrI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => console.log(err));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
tokenAuthentication(passport);

app.use('/api/users', users);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on ${port}`));
