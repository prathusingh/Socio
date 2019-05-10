"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _keys = _interopRequireDefault(require("./config/keys"));

var _users = _interopRequireDefault(require("./routes/api/users"));

var _passport2 = _interopRequireDefault(require("./config/passport"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MongoClient = require('mongodb').MongoClient;

var app = (0, _express["default"])(); // Body parser middleware

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // use cors

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use((0, _cors["default"])(corsOption)); // Connect to db

var dbUrI = process.env.NODE_ENV === 'dev' ? _keys["default"].mongoURI : _keys["default"].mongoURIProd;
var client = new MongoClient(dbUrI, {
  useNewUrlParser: true
});
client.connect(function () {
  console.log('DB connected');
}, function (err) {
  console.log(err);
}); // Passport middleware

app.use(_passport["default"].initialize()); // Passport Config

(0, _passport2["default"])(_passport["default"]);
app.use('/api/users', _users["default"]);
var port = process.env.PORT || 8000;
app.listen(port, function () {
  return console.log("Server running on ".concat(port));
});