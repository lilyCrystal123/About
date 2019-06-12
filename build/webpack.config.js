var path = require('path')
var webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const entryConfig = require('./entrys.js')

const getHtmlConfig = function(name, chunks) {
  return {
    template: `./src/views/${name}/index.html`,
    filename: `../dist/${name}.html`,
    inject: true,
    hash: true, 
    chunks: [name] // 实现多入口的核心，决定自己加载哪个js文件，这里的 name 指的是 entry 对象的 key 所对应的入口打包出来的js文件
  }
}

module.exports = {
  mode: 'development',
  // 入口文件
  entry: entryConfig.entry,
  // 出口文件
  output: {
    path: path.resolve(__dirname, '../dist'),
    // 文件名，将打包好的导出为bundle.js
    filename: 'js/[name].js'
  },
  module: {},
  plugins: [
    new CleanWebpackPlugin()
  ]
}

Object.keys(entryConfig.entry).forEach(function(ele) {
  module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(ele, [ele])))
})