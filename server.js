require('dotenv').config()

const path = require('path')
const express = require('express')
const request = require('request')
const whois = require('whois-ux')
const dn = require('dn')
const mongoose = require('mongoose')
const DOMAIN = require('./models/domain')
const APPRAISAL = require('./models/appraisal')
const parser = require('xml2json')
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

app.get('/sample/appraisals', function(req, res) {
  request('http://www.estibot.com/api.php?a=get&email=' + process.env.ESTIBOT_USR + '&password=' + process.env.ESTIBOT_PASS + '&c=appraise&t=websitestud.io>>femto.io', function (error, response, body) {
    if (error) {
      res.send(error)
    } else {
      res.send(JSON.stringify(parser.toJson(body)))
    }
  })
})

app.get('/sample/appraisals/find', function(req, res) {
  APPRAISAL.find({ }, function(error, data){
    if(error){
      res.send(error)
    } else {
      res.send(data)
    }
  })
})

app.get('/sample/appraisals/remove', function(req, res) {
  APPRAISAL.remove({ }, function(error, data){
    if(error){
      res.send(error)
    } else {
      res.send(data)
    }
  })
})


app.get('/sample/appraisals/:domain', function(req, res) {
  if ('domain' in req.params){
    const url = 'http://www.estibot.com/api.php?a=get&email=' + process.env.ESTIBOT_USR + '&password=' +
      process.env.ESTIBOT_PASS + '&c=appraise&t=' + req.params.domain
    request(url, function (error, response, body) {
      if (error) {
        res.send(error)
      } else {
        findAppraisal(req.params.domain).then(
          function( details ){
            if (details.length < 1) {
              addAppraisal({
                name: req.params.domain,
                meta: JSON.stringify(parser.toJson(body))
              }).then(
                function( details ) { res.send(JSON.stringify(details)) },
                function( error ) { res.send(JSON.stringify(error)) }
              )
            } else {
              res.send("Dupe: " + req.params.domain)
            }
          },
          function( error ){
            console.log(error)
            res.send(error)
          }
        )
      }
    })
  } else {
   res.send("No domain in request")
  }
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
              console.log(details.map((deets) => { return { name : deets.name } } ))
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

//This queries the domain for info
//app.get('/whois/:domain', function(req, res) {
//  if ('domain' in req.params){
//    getDig(req.params.domain).then(
//      function(data){
//        res.send(data)
//      },
//      function(err){
//        res.send(err)
//      }
//    )
//  } else {
//    res.send("No domain in request")
//  }
//})

app.get('/whois/:domain', function(req, res) {
  if ('domain' in req.params){
    whois.whois(req.params.domain, function (error, data){
      console.log(data)
      if (error) {
        res.send(error)
      } else {
        console.log("whois fetched")
        console.log(error)
        console.log(data)
        return res.send(JSON.stringify(data))
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

/*
http://domainindex.com/api.php?action=appraise&domain=example.com&key=7b59b0c6-2017-0425-0640-05594cd56368&mode=json
process.env.DOM_INDEX
*/

app.get('/appraisals/:domain', function(req, res) {
  if ('domain' in req.params){
  // Here is where the domains need to be appraised if they are within the time period
  console.log(req.params)
  console.log('http://domainindex.com/api.php?action=appraise&domain=' + req.params.domain + '&mode=json&key=' + process.env.DOM_INDEX)
  request('http://domainindex.com/api.php?action=appraise&domain=' + req.params.domain + '&mode=json&key=' + process.env.DOM_INDEX, function (error, response, body) {
    console.log("return")
    if (error) {
      res.send(error)
    } else {
      res.send(body)
    }
  })
  } else {
    res.send("No domain in request")
  }
})

app.get('/auctions/get', function(req, res) {
  //For testing purposes, we are setting the exp date 7 days from now
  const fakeDomains = [
    'fake.io',
    'awesome.io',
    'disney.io',
    'tables.io',
    'keyboardcatz.io',
    'milkshakes.io',
  ]

  var d = new Date()
  var day = d.getDay()
  var diff = d.getDate() - day + (day == 0 ? -6:1)
  var start  = new Date(d.setDate(diff - 7))
  var placed  = new Date(d.setDate(diff))
  var monday  = new Date(d.setDate(diff + 7))

  const fakeBids = [
    { uuid : 'abc123', bid : 10, placed: placed },
    { uuid : 'abc124', bid : 50, placed: placed  },
    { uuid : 'abc123', bid : 100, placed: placed },
    { uuid : 'abc126', bid : 120, placed: placed },
    { uuid : 'abc124', bid : 150, placed: placed },
    { uuid : 'abc125', bid : 200, placed: placed },
  ]

  res.send(JSON.stringify(fakeDomains.map((dom) => { return { name : dom, start: start, expires : monday, bids : fakeBids } })))
})

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

app.get('/saveall', function(req, res) {
  request('https://wwws.io/api/full/962/' + process.env.DOM_USR + '/' + process.env.DOM_PASS + '/', function (error, response, body) {
    if (error) {
      res.send(error)
    } else {
      saveBatches(body.split(/\r\n|\r|\n/).splice(0,10)).then(
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

function saveDomain(domain){
  return new Promise(function(resolve, reject) {
    findMongo(domain).then(
      function( details ) {
        console.log("return from find")
        console.log(domain)
        console.log(details)
        if (!details.length){
          getDig(domain).then(
            function(data){
              addMongo(data).then(function(dat){ resolve(dat) },function(err){ reject(err) })
            },
            function(err){ reject(err) }
          )
        } else {
          console.log("Dupe")
          resolve({ name: domain, error: "dupe" })
        }
      }, function( error ) {
        reject({ name: domain, error: error })
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