#! /usr/bin/env node
require('dotenv').config()

const dn = require('dn')
const request = require('request')
const DOMAIN = require('./models/domain')
const mongoose = require('mongoose')

const dateOpts = { year: '2-digit', month: '2-digit', day: '2-digit' }
const VOLATILE_LOOKBACK = 90

const sPeriod = new Date()
sPeriod.setDate(sPeriod.getDate() + parseInt(VOLATILE_LOOKBACK))

mongoose.connect(process.env.MONGODB)

function notWildcard(domain){
  return domain.split('.').length < 3
}

function start(){
  request('https://wwws.io/api/full/962/' + process.env.DOM_USR + '/' + process.env.DOM_PASS + '/', function (error, response, body) {
    console.log("return")
    if (error) {
      console.log(error)
    } else {
      saveBatches(body.split(/\r\n|\r|\n/).filter(notWildcard))
    }
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

function checkDoms(domains){
  domains.shift()
  if (domains.length) {
    console.log("Left: " + domains.length)
    //setTimeout(function(){ saveBatches(domains) }, 250)
    saveBatches(domains)
  } else {
    console.log("Fin")
    process.exit()
  }
}

function saveBatches(domains){
  saveDomain(domains[0]).then(function(dat){
    checkDoms(domains)
  },function(err){
    console.log(err)
    checkDoms(domains)
  })
}

function getDig(domain){
  return new Promise(function(resolve, reject) {
    dn.dig(domain + '.check.nic.io', 'A', function (err, data) {
      if (err){
        reject({ name: domain, error: err})
      } else {
        if ('answer' in data && data.answer.length > 0) {
          const format = data.answer[0].address.split('.')
          if (format.length < 4 || (format.length > 1 && format[1] === 255)) {
            //These domains never expire
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
        const cachExp = (details.length > 0 && ('expires' in details[0] && sPeriod > new Date(details[0].expires)))
        if (!details.length || cachExp){
          console.log("Cache Exp: " + cachExp)
          getDig(domain).then(
            function(data){
              addMongo(data, details).then(
                function(dat){
                  console.log("Saved")
                  console.log(dat)
                  resolve(dat)
                },
                function(err){ reject(err) }
              )
            },
            function(err){ reject(err) }
          )
        } else {
          console.log("Dupe")
          console.log(details)
          resolve({ name: domain, error: "dupe" })
        }
      }, function( error ) {
        reject({ name: domain, error: error })
      }
    )
  })
}

function addMongo(dom, prev){
  return new Promise(function(resolve, reject) {
    let domOb = new DOMAIN(dom)
    if (typeof prev[0] != 'undefined') {
      domOb = Object.assign(prev[0], { expires: dom.expires })
    }
    domOb.save( function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

start()