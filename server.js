require('dotenv').config()

const path = require('path')
const express = require('express')
const request = require('request')
const whois = require('whois-ux')
const dn = require('dn')
const bodyParser = require('body-parser')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const NodeCache = require( "node-cache" )
const models  = require('./models')

const app = express()
const PORT = process.env.PORT || 3000
const dateOpts = { year: '2-digit', month: '2-digit', day: '2-digit' }
const pIncrements = [ 30 , 60 , 90 ]
const acceptableActions = ['create','backorder']

const client = 1

//The sync service only gets updated once a day, so we can set the cache ttl to that amount
const cache = new NodeCache({ stdTTL: 86400 })

//mongoose.connect(process.env.MONGODB)

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpack = require('webpack')
  const config = require('./webpack.config')
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const queryMemDB = (res, key, table, order) => {
  const memory = cache.get(key)
  if (memory){
    res.send({ status: "done", data: memory })
  } else {
    models[table].findAll({ limit : 200, where: { client_dbid: client }, order: [ order ] }).then(function(rows) {
      const data = rows.map((row,idx) => row.toJSON() )
      cache.set(key, data)
      res.send({ status: "done", data: data })
    })
  }
}

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get('/members', function(req, res) {
  queryMemDB(res, 'members', 'vw_provider_members', 'full_name')
})

app.get('/providers', function(req, res) {
  queryMemDB(res, 'providers', 'vw_provider_index', 'full_name')
})

app.get('/campaigns', function(req, res) {
  queryMemDB(res, 'campaigns', 'campaigns', 'name')
})

app.listen(PORT, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT)
  }
})