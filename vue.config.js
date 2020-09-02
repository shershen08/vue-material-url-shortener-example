// require('@babel/register'); 
// require('./test-workbox.mjs'); 

const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    //modify defalut loader
    chainWebpack: config => {

      //disable eslint
      config.module.rules.delete('eslint');

      //do chunks
      return {
          optimization: {
              splitChunks: {
                minSize: 1000,
                maxSize: 2500,
              }
            }
      }
    },
    //add new items to the loaders
    configureWebpack: {
        plugins: [
            new workboxPlugin.GenerateSW({
                swDest: 'sw.js',
                clientsClaim: true,
                maximumFileSizeToCacheInBytes: 7000000,
                skipWaiting: true,
                runtimeCaching: [{
                  urlPattern: new RegExp('//fonts.googleapis.com'),
                  handler: 'StaleWhileRevalidate'
                }]
              })
        ]
      }
}