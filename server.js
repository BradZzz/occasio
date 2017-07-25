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

const queryMemDB = (res, key, table, params) => {
  const memory = cache.get(key)
  if (memory){
    res.send({ status: "done", data: memory })
  } else {
    models[table].findAll(params).then(function(rows) {
      const data = rows.map((row,idx) => row.toJSON() )
      cache.set(key, data)
      res.send({ status: "done", data: data })
    })
  }
}

const error = (req, res, msg, code) => {
  res.send({
    status: "error",
    msg: msg,
    info: {
      query: req.query,
      body: req.body,
      params: req.params
    },
    code: code
  })
}

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get('/members', function(req, res) {
  const params = { limit : 200, where: { client_dbid: client }, order: [ 'full_name' ] }
  queryMemDB(res, 'members', 'vw_member_index', params)
})

app.get('/providers', function(req, res) {
  const params = { limit : 200, where: { client_dbid: client }, order: [ 'full_name' ] }
  queryMemDB(res, 'providers', 'vw_provider_index', params)
})

app.get('/campaigns', function(req, res) {
  const params = { limit : 200, where: { client_dbid: client }, order: [ 'name' ] }
  queryMemDB(res, 'campaigns', 'campaigns', params)
})

app.get('/hccs', function(req, res) {
  if ('member' in req.query) {
    const params = { where: { member_dbid: req.query.member }, order: [ 'hcc_code' ] }
    queryMemDB(res, 'hcc_' +  req.query.member, 'member_hccs', params)
  } else {
    error(req,res,"Bad Request",400)
  }
})

app.get('/dxs', function(req, res) {
  if ('member' in req.query) {
    const params = { where: { member_dbid: req.query.member }, order: [ 'date_of_service' ] }
    queryMemDB(res, 'dx_' +  req.query.member, 'member_dxcodes', params)
  } else {
    error(req,res,"Bad Request",400)
  }
})

app.listen(PORT, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT)
  }
})