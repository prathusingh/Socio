import dotenv from 'dotenv';

//configure parsing for env file
dotenv.config();

export default {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};
