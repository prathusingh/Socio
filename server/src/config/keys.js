import dotenv from 'dotenv';

//configure parsing for env file
dotenv.config();

export default {
  mongoURI: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};
