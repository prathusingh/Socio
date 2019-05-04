"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//configure parsing for env file
_dotenv["default"].config();

var _default = {
  mongoURI: process.env.MONGO_URI,
  mongoURIProd: process.env.MONGO_URI_PROD,
  secretKey: process.env.SECRET_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};
exports["default"] = _default;