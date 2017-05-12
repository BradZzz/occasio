// @flow
import { takeEvery, delay } from "redux-saga"
import { select, put, call, fork } from "redux-saga/effects"
import * as D from "../actions/domain"
import fetch from 'isomorphic-fetch'

//Quarter hour
const QHOUR = 15 * 60 * 1000;

//Half hour
const HHOUR = 30 * 60 * 1000;

export function* queryDomains(req) {
  yield takeEvery(D.QUERY_DOMAINS, requestD)
}

export function* requestD(req) {
  const state = yield select()
  const { meta, lastFetched } = state.domain
  if (((new Date) - lastFetched) < HHOUR || meta.length < 1) {
    yield put( D.requestDomains(req) )
    const msg = yield call(fetchDomains, req)
    const msgApp = yield call(fetchAppraisals, req)
    const mapped = msg.map((domain)=>{
      const met = msgApp.filter(( entry ) => {
        if ('name' in entry && 'name' in domain && entry.name === domain.name){
          return true
        }
        return false
      })
      if (met.length > 0){
        const meat = JSON.parse(JSON.parse(met[0].meta)).results.appraisal
        return Object.assign({}, domain, { meta: meat, value: meat['appraised_value'] })
      } else {
        return Object.assign({}, domain, { meta: { 'appraised_value' : 0 }, value: 0 })
      }
    })
    yield put( D.receiveDomains(mapped) )
    yield put( D.receiveAppraisals(msgApp) )
  }
}

//export function* queryAppraisals(req) {
//  yield takeEvery(D.QUERY_APPRAISALS, requestA)
//}

//export function* requestA(req) {
//  const state = yield select()
//  const { meta, metaApp, lastFetchedApp } = state.domain
//  if (((new Date) - lastFetchedApp) < HHOUR || metaApp.length < 1) {
//    yield put( D.requestAppraisals(req) )
//    const msg = yield call(fetchAppraisals, req)
//    const mapped = meta.map((domain)=>{
//      const met = msg.filter(( entry ) => {
//        if ('name' in entry && entry.name === name){
//          return true
//        }
//        return false
//      })
//      if (met.length > 0){
//        const meat = JSON.parse(JSON.parse(met[0].meta)).results.appraisal
//        console.log(Object.assign({}, domain, { meta: meat, value: meat['appraised_value'] }))
//        return Object.assign({}, domain, { meta: meat, value: meat['appraised_value'] })
//      } else {
//        return Object.assign({}, domain, { meta: { 'appraised_value' : 0 }, value: 0 })
//      }
//    })
//    console.log("finished zipping")
//    console.log(mapped)
//    console.log("<---------->")
//    yield put( D.receiveAppraisals(msg) )
//  }
//}
//

export function fetchDomains(req) {
  const { period } = req.payload
  return fetch('/list/' + period).then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}

export function fetchAppraisals(req) {
  const { period } = req.payload
  return fetch('/appraisals/30').then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}