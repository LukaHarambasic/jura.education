module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/_variables.sass"'
      }
    }
  },
  pwa: {
    name: 'jura.education',
    themeColor: '#50223C',
    msTileColor: '#50223C',
    orientation: 'landscape'
  }
}
