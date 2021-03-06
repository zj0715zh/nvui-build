'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
var routes = require('../route/index');
var bodyParser = require('body-parser')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

//本地服务接口
const port = process.env.PORT || config.dev.port
//启动时是否自动打开浏览器，在linux服务器下可关闭
const autoOpenBrowser = !!config.dev.autoOpenBrowser
//接口转发
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
app.use(hotMiddleware)

// 代理转发
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 这个会影响express的路由配置，如果要配置express路由就注释掉这行
// app.use(require('connect-history-api-fallback')())

// 本地服务中间件
app.use(devMiddleware)


app.use(bodyParser.urlencoded({extended:false}))//接受form表单提交的数据
app.use(bodyParser.json())//接受json数据格式提交的数据

// 静态文件配置
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

//接口路由
app.get('/getLeftNav',routes.getLeftNav)
app.post('/add',routes.add)
app.post('/getComponentByType',routes.getComponentByType)
app.post('/getComponentByName',routes.getComponentByName)
app.post('/updateComponent',routes.updateComponent)

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
