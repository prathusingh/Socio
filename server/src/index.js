import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import db from './config/keys.js';
import users from './routes/api/users';
import tokenAuthentication from './config/passport';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to db
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log(err);
  });

// Passport middleware
app.use(passport.initialize());

// Passport Config
tokenAuthentication(passport);

// Use routes
app.use('/api/users', users);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on ${port}`));
