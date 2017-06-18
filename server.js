require('dotenv').config()

const path = require('path')
const express = require('express')
const request = require('request')
const whois = require('whois-ux')
const dn = require('dn')
//const mongoose = require('mongoose')
//const DOMAIN = require('./models/domain')
//const AUCTION = require('./models/auction')
//const APPRAISAL = require('./models/appraisal')
//const BIDS = require('./models/bids')
const bodyParser = require('body-parser')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const NodeCache = require( "node-cache" )

const app = express()
const PORT = process.env.PORT || 3000
const dateOpts = { year: '2-digit', month: '2-digit', day: '2-digit' }
const pIncrements = [ 30 , 60 , 90 ]
const acceptableActions = ['create','backorder']

//The appraisal service only gets updated once a day, so we can set the cache ttl to that amount
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

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(PORT, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT)
  }
})