import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import db from './config/keys.js';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);

// Connect to db
mongoose
.connect(db.mongoURI , { useNewUrlParser: true })
.then(() => { console.log('DB connected')} )
.catch((err) => {console.log(err)});



const port = process.env.PORT || 8000;

app.listen(port, () =>  console.log(`Server running on ${port}`));
