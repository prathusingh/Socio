export default {
  getAPIURLPrefix: () => {
    return process.env.PLATFORM === 'production'
      ? process.env.API_PROD_PREFIX
      : process.env.API_DEV_PREFIX;
  }
};
