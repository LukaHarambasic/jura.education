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
    orientation: 'landscape',
    assetsVersion: '2',
    icons: [
      {
        src: './img/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: './img/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: './img/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-512x512.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150-150.png'
    }
  }
}
