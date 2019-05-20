require('dotenv').config();

export default {
  getAPIURLPrefix: () => {
    //configure parsing for env file
    dotenv.config();
    return process.env.PLATFORM === 'production'
      ? process.env.API_PROD_PREFIX
      : process.env.API_DEV_PREFIX;
  }
};
