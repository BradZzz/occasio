require('dotenv').config()

const path = require('path')
const express = require('express')
const request = require('request')
const whois = require('whois-ux')
const mongoose = require('mongoose')
const DOMAIN = require('./models/domain')
const app = express()
const PORT = process.env.PORT || 3000

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

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
})

//This gets the list of domains
app.get('/data/io', function(req, res) {
  request('https://wwws.io/api/full/962/' + process.env.DOM_USR + '/' + process.env.DOM_PASS + '/', function (error, response, body) {
    if (error) {
      res.send(error)
    } else {
      console.log(body.split(/\r\n|\r|\n/).length)
      res.send(body.split(/\r\n|\r|\n/))
    }
  })
})

//This queries the domain for info
app.get('/whois/:domain', function(req, res) {
  if ('domain' in req.params){
    whois.whois(req.params.domain, function (error, data){
      if (error) {
        res.send(error)
      } else {
        res.send(JSON.stringify(data))
      }
    })
  } else {
    res.send("No domain in request")
  }
})

app.get('/whois/:domain/save', function(req, res) {
  if ('domain' in req.params){

    saveDomain(req.params.domain).then(
      function( details ) { res.send(JSON.stringify(details)) },
      function( error ) { res.send(JSON.stringify(error)) }
    )
//    whois.whois(req.params.domain, function (error, data){
//      if (error) {
//        res.send(error)
//      } else {
//        findMongo(req.params.domain).then(
//          function( details ) {
//            console.log(details)
//            if ( !details.length ) {
//              addMongo({
//                name: req.params.domain,
//                status: data.Status,
//                expires: data.Expiry,
//                meta: JSON.stringify(data),
//              }).then(
//                function( details ) { res.send(JSON.stringify(details)) },
//                function( error ) { res.send(JSON.stringify(error)) }
//              )
//            } else {
//              res.send(JSON.stringify({ error: "dupe" }))
//            }
//          },
//          function( error ) { res.send(JSON.stringify(error)) }
//        )
//      }
//    })
  } else {
    res.send("No domain in request")
  }
})

app.get('/whois/:domain/find', function(req, res) {
  if ('domain' in req.params){
    findMongo(req.params.domain).then(
      function( details ) { res.send(JSON.stringify(details)) },
      function( error ) { res.send(JSON.stringify(error)) }
    )
  } else {
    res.send("No domain in request")
  }
})

app.get('/list', function(req, res) {
  findMongoL().then(
    function( details ) { res.send(JSON.stringify(details)) },
    function( error ) { res.send(JSON.stringify(error)) }
  )
})

app.get('/saveall', function(req, res) {
  request('https://wwws.io/api/full/962/' + process.env.DOM_USR + '/' + process.env.DOM_PASS + '/', function (error, response, body) {
    if (error) {
      res.send(error)
    } else {
      saveBatches(body.split(/\r\n|\r|\n/).splice(100,200)).then(
        function( details ) { res.send("Process started successfully") },
        function( error ) { res.send("Error starting process") }
      )
    }
  })
})

app.get('/removeall', function(req, res) {
  DOMAIN.remove({}, function(error){
    if(error){
      return res.send(error)
    }
    else{
      return res.send("done")
    }
  })
})

function saveDomain(domain){
  return new Promise(function(resolve, reject) {
    findMongo(domain).then(
      function( details ) {
        console.log("return from find")
        console.log(domain)
        console.log(details)
        if (!details.length){
          whois.whois(domain, function (error, data){
            if (error || !('Status' in data || 'Expiry' in data)) {
              console.log("Error")
              console.log({ origin: domain, error: error })
              if (!('Status' in data || 'Expiry' in data)){
                //return saveDomain(domain)
                resolve({ origin: domain, error: error })
              } else {
                resolve({ origin: domain, error: error })
              }
            } else {
              console.log("Lookup")
              console.log({
                name: domain,
                status: data.Status,
                expires: data.Expiry,
                meta: JSON.stringify(data),
              })
              return addMongo({
                name: domain,
                status: data.Status,
                expires: data.Expiry,
                meta: JSON.stringify(data),
              })
            }
          })
        } else {
          console.log("Dupe")
          resolve({ origin: domain, error: "dupe" })
        }
      }, function( error ) {
        resolve({ error: error })
      }
    )
  })
}

/*

Count the current number of threads and cut off after a certain threshold

*/

//var count = 0
//
//function iterate(domains){
//  return new Promise(function(resolve, reject) {
//    domains.shift()
//    if (domains.length) {
//      console.log("Left: " + domains.length)
//      return saveBatches(domains)
//    } else {
//      console.log("Fin")
//      return resolve("fin")
//    }
//  })
//}

function saveBatches(domains){
  return new Promise(function(resolve, reject) {
    saveDomain(domains[0]).then(function(dat){
      console.log("Done")
      //    count++
      //    if (count > 50){
      //      console.log("Cooling Down... (5 sec)")
      //      myVar = setTimeout(iterate(domains), 5000)
      //    } else {
      //      iterate(domains)
      //    }
      //      return iterate(domains)
      domains.shift()
      if (domains.length) {
        console.log("Left: " + domains.length)
        return saveBatches(domains)
      } else {
        console.log("Fin")
        resolve("fin")
      }

    },function(err){
      console.log(err)
      resolve(err)
    })
  })
}

//function saveAll(domains){
//  return Promise.all(domains.map(saveDomain))
//}

function findMongoL(){
  return new Promise(function(resolve, reject) {
    DOMAIN.find({ }, function(error, data){
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
      } else {
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