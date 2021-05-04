module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      mainFields: ['main', 'browser']
    }
  },
};
