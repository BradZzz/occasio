require('dotenv').config()

const path = require('path')
const express = require('express')
const request = require('request')
const whois = require('whois-ux')
const dn = require('dn')
const mongoose = require('mongoose')
const DOMAIN = require('./models/domain')
const AUCTION = require('./models/auction')
const APPRAISAL = require('./models/appraisal')
const BIDS = require('./models/bids')

const bodyParser = require('body-parser')
//const parser = require('xml2json')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const NodeCache = require( "node-cache" )

const app = express()
const PORT = process.env.PORT || 3000
const dateOpts = { year: '2-digit', month: '2-digit', day: '2-digit' }
const pIncrements = [ 30 , 60 , 90 ]

//The appraisal service only gets updated once a day, so we can set the cache ttl to that amount
const cache = new NodeCache({ stdTTL: 86400 })

mongoose.connect(process.env.MONGODB)

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

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
})

app.get('/appraisals/:period', function(req, res) {
  if ('period' in req.params && pIncrements.indexOf(parseInt(req.params.period)) > -1){
    cache.get( "appraisals/" + req.params.period, function( error, value ){
      if( !error ){
        if(value == undefined){
          var sPeriod = new Date()
          sPeriod.setDate(sPeriod.getDate() + parseInt(req.params.period))
          findMongoL({ "expires" : { "$lte": sPeriod, "$gte": new Date() } }).then(
            function( details ) {
              //console.log(details.map((deets) => { return { name : deets.name } } ))
              const list = details.map((deets) => { return { name : deets.name } })
              APPRAISAL.find(list, function(error, data){
                if(error){
                  res.send(JSON.stringify(error))
                } else {
                  cache.set( "appraisals/" + req.params.period, JSON.stringify(data), function( error, success ){
                    if( !error && success ){
                      res.send(JSON.stringify(data))
                    } else {
                      res.send(JSON.stringify(error))
                    }
                  })
                }
              })
            },
            function( error ) { res.send(JSON.stringify(error)) }
          )
        } else {
          res.send(value)
        }
      } else {
        res.send(JSON.stringify(error))
      }
    })
  } else {
    res.send("Bad period, or no period in request")
  }
})

function findAppraisal(dom){
  return new Promise(function(resolve, reject) {
    APPRAISAL.find({ name: dom }, function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

function addAppraisal(dom){
  return new Promise(function(resolve, reject) {
    (new APPRAISAL(dom)).save( function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

app.get('/bids/get', function(req, res) {
  BIDS.find({ }, function(error, data){
    if(error){
      res.send(JSON.stringify(error))
    } else {
      res.send(JSON.stringify(data))
    }
  })
})

app.post('/bids/post', function(req, res) {
  console.log(req.body)
  if ('body' in req && 'domID' in req.body && 'usrID' in req.body && 'amount' in req.body) {
    BIDS.find({domID : req.body.domID}).sort({amount : -1}).limit(1).exec(function(err, top){
       if (err) {return res.send({ status: "Error", msg: err })}
       console.log("top bid")
       console.log(top)
       if ( top.length == 0 || (top[0].amount < req.body.amount )) {
         (new BIDS(req.body)).save( function(error, data){
           if(error){
             res.send({ status: "Error", msg: error })
           } else {
             res.send({ status: "Success", msg: data })
           }
         })
       } else {
         res.send({ status: "Error", msg: "Error validating bid" })
       }
    })
  } else {
    res.send({ status: "Error", msg: "Invalid Post Request" })
  }
})

app.get('/auctions/get', function(req, res) {
  findAuctionL({ "expires" : { "$gte": new Date() }/*, start : { }*/ }).then(
    function( details ) { res.send(JSON.stringify(details)) },
    function( error ) { res.send(JSON.stringify(error)) }
  )
})

app.post('/auctions/post', function(req, res) {
  console.log(req.body)
  if ('body' in req && 'name' in req.body && 'usrID' in req.body && req.body.name) {
    saveAuction(req.body).then(
      function(details){
        console.log(details)
        console.log(details)
        res.send(JSON.stringify(details))
      },
      function(err){
        console.log(err)
        res.send(JSON.stringify(err))
      }
    )
  } else {
    res.send({ status: "Error", msg: "Invalid Post Request" })
  }
})

function findAuctionL(query){
  return new Promise(function(resolve, reject) {
    AUCTION.find(query, function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

function addAuction(dom){
  return new Promise(function(resolve, reject) {
    (new AUCTION(dom)).save( function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

function findAuction(domain){
  return new Promise(function(resolve, reject) {
    AUCTION.find({ name: domain }, function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

function nxtMonday(){
  const d = new Date()
  d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7)
  return d
}

function saveAuction(info){
  const { name : domain } = info
  return new Promise(function(resolve, reject) {
    findAuction(domain).then(
      function( details ) {
        console.log("return from find")
        console.log(domain)
        console.log(details)
        if (!details.length){
          const d = nxtMonday()
          console.log(d)
          const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
          const expires = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 14, 0, 0, 0, 0)
          const nInfo = Object.assign({}, info, { start : start, expires : expires })
          console.log("Creating new object")
          console.log(nInfo)
          addAuction(nInfo).then(function(dat){ resolve({ status: "Success", msg: dat }) },function(err){ reject({ status: "Error", msg: err }) })
        } else {
          resolve({ status: "Duplicate Site", msg: info })
        }
      }, function( error ) {
        reject({ status: "Error", msg: error })
      }
    )
  })
}

app.get('/list/:period', function(req, res) {
  if ('period' in req.params && pIncrements.indexOf(parseInt(req.params.period)) > -1){
    var sPeriod = new Date()
    sPeriod.setDate(sPeriod.getDate() + parseInt(req.params.period))
    findMongoL({ "expires" : { "$lte": sPeriod, "$gte": new Date() } }).then(
      function( details ) { res.send(JSON.stringify(details)) },
      function( error ) { res.send(JSON.stringify(error)) }
    )
  } else {
    res.send("Bad period, or no period in request")
  }
})

app.post('/namespace/action/', function(req, res) {
  console.log(req.body)
  if ('body' in req && 'domName' in req.body && 'usrID' in req.body && 'action' in req.body) {
    console.log(req.body)
    res.send({ status: "Valid", msg: req.body })
  } else {
    res.send({ status: "Error", msg: "Invalid Post Request" })
  }
})

function getDig(domain){
  return new Promise(function(resolve, reject) {
    dn.dig(domain + '.check.nic.io', 'A', function (err, data) {
      console.log(data)
      if (err){
        reject({ name: domain, error: err})
      } else {
        if ('answer' in data && data.answer.length > 0) {
          const format = data.answer[0].address.split('.')
          if (format.length < 4 || (format.length > 1 && format[1] === 255)) {
            //These domains never expire. We can't buy them
            reject({ name: domain, expires: NaN })
          } else {
            const exp = new Date(format[1], format[2] - 1, format[3], 0, 0, 0, 0)
            resolve({ name: domain, expires: exp.toLocaleDateString("en-US",dateOpts) })
          }
        } else {
          reject({ name: domain, error: 'no answer in response!'})
        }
      }
    })
  })
}

function findMongoL(query){
  return new Promise(function(resolve, reject) {
    DOMAIN.find(query, function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

function findMongo(domain){
  return new Promise(function(resolve, reject) {
    DOMAIN.find({ name: domain }, function(error, data){
      if(error){
        reject(error)
      } else {d
        resolve(data)
      }
    })
  })
}

function addMongo(dom){
  return new Promise(function(resolve, reject) {
    (new DOMAIN(dom)).save( function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

app.listen(PORT, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT)
  }
})