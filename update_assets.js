#! /usr/bin/env node
require('dotenv').config()

const dn = require('dn')
const request = require('request')
const DOMAIN = require('./models/domain')
const APPRAISAL = require('./models/appraisal')
const mongoose = require('mongoose')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

const dateOpts = { year: '2-digit', month: '2-digit', day: '2-digit' }
const VOLATILE_LOOKBACK = 90
const hYear = (365 * 24 * 60 * 60 * 1000) / 2

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

function updateAppraisals(domain){
  findAppraisal(domain).then(
    function( details ){
      const exp = new Date().getTime() - hYear
      if ( details.length < 1 || ( details.length > 0 && details[0].updated > exp )) {
        console.log("Updating Domain: " + domain)
        const url = 'http://www.estibot.com/api.php?a=get&email=' + process.env.ESTIBOT_USR + '&password=' +
              process.env.ESTIBOT_PASS + '&c=appraise&t=' + domain
        request(url, function (error, response, body) {
          if (error) {
            res.send(error)
          } else {
            try {
              parser.parseString(body, function (err, parsed) {
                console.dir(result);
                console.log('Done');
                addAppraisal({
                  name: domain,
                  meta: JSON.stringify(parsed)
                }, details).then(
                  function( details ) { console.log("Finished Updating Domain: " + domain) },
                  function( error ) { console.log("Error Updating Domain: " + JSON.stringify(error))  }
                )
              })
            } catch(err) {
              console.log("Error parsing appraisal XML!")
            }
          }
        })
      } else {
        console.log("Dupe: " + domain)
      }
    },
    function( error ){
      console.log(error)
    }
  )
}

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

function addAppraisal(dom, prev){
  return new Promise(function(resolve, reject) {
    let appOb = new APPRAISAL(dom)
    if (typeof prev[0] != 'undefined') {
      appOb = Object.assign(prev[0], { meta : dom.meta, updated: new Date() })
    }
    appOb.save( function(error, data){
      if(error){
        reject(error)
      } else {
        resolve(data)
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
          updateAppraisals(domain)
          getDig(domain).then(
            function(data){
              addMongo(data, details).then(
                function(dat){
                  console.log("Saved")
                  console.log(dat)
                  const exp = new Date(dat.expires)
                  if (sPeriod >= exp && exp >= new Date()) {
                    console.log("Updating Appraisal: " + domain)
                    updateAppraisals(domain)
                  }
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