// @flow
import { takeEvery, delay } from "redux-saga"
import { select, put, call, fork } from "redux-saga/effects"
import * as D from "../actions/domain"
import fetch from 'isomorphic-fetch'

//Qarter hour
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
    console.log(msg)
    yield put( D.receiveDomains(msg) )
  }
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