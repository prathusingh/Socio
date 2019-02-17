const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);

const port = process.env.PORT || 8000;

app.listen(port, () =>  console.log(`Server running on ${port}`));
