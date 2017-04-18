// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as D from "../actions/domain"
import fetch from 'isomorphic-fetch'

export function* queryDomains(req) {
  yield takeEvery(D.QUERY_DOMAINS, requestD)
}

export function* requestD(req) {
  yield put( D.requestDomains(req) )
  const msg = yield call(fetchDomains, req)
  console.log(msg)
  yield put( D.receiveDomains(msg) )
}


export function fetchDomains(req) {
  const { period } = req.payload
  return fetch('/list/30').then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}