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
const AWS = require('aws-sdk')
const bcrypt = require('bcrypt')

const app = express()
const PORT = process.env.PORT || 3000
const dateOpts = { year: '2-digit', month: '2-digit', day: '2-digit' }
const pIncrements = [ 30 , 60 , 90 ]
const acceptableActions = ['create','backorder']

const client = 1

//The sync service only gets updated once a day at most, so we can set the cache ttl to that amount
const cache = new NodeCache({ stdTTL: 86400 })

const bucket = process.env.CHART_BUCKET

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

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

/*
  TODO: Complete models with no parameters
*/

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

/*
  TODO: Models that rely on parameters
*/

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

app.get('/charts', function(req, res) {
  if ('member' in req.query) {
    const params = { where: { member_dbid: req.query.member }, order: [ 'retrieval_date' ] }
    queryMemDB(res, 'chart_' +  req.query.member, 'member_charts', params)
  } else {
    error(req,res,"Bad Request",400)
  }
})

app.get('/download/check', function(req, res) {
  if ('key' in req.query) {
    const key = req.query.key
    const s3 = new AWS.S3()
    s3.listObjects({
      Bucket: bucket,
      Prefix: key
    }, function (err, data) {
      if (err || data.Contents.length == 0 || data.Contents[0].Key != key) {
        res.send({ available: false })
      } else {
        res.send({ available: true })
      }
    })
  } else {
    error(req,res,"Bad Request", 400)
  }
})

//Make sure you check that the download is valid before calling this function
app.get('/download/chart', function(req, res) {
  if ('key' in req.query) {
    const key = req.query.key
    const s3 = new AWS.S3()

    var pdfStream = s3.getObject({
      Bucket: bucket,
      Key: key
    }).createReadStream()

    bcrypt.hash(key, 10, function(err, hash) {
      res.setHeader('Content-disposition', 'attachment; filename=' + hash + '.pdf')
      res.setHeader('Content-type', 'application/octet-stream')
      pdfStream.pipe(res)
    })
  } else {
    error(req,res,"Bad Request", 400)
  }
})

/*
  TODO: Stored procedures here
*/

app.get('/letters', function(req, res) {
  if ('member' in req.query) {
    models.sequelize.query('select * from ' + process.env.SCHEMA + '.fn_get_letters_member(' + req.query.member + ')').then(function(response){
      res.json(response)
    }).error(function(err){
      res.json(err)
    })
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
