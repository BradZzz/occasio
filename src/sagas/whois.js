// @flow
import { takeEvery, delay } from "redux-saga"
import { select, put, call, fork } from "redux-saga/effects"
import * as W from "../actions/whois"
import fetch from 'isomorphic-fetch'

export function* queryWhois(req) {
  yield takeEvery(W.QUERY_WHOIS, requestWhois)
}

export function* requestWhois(req) {
  //We have to make sure we don't query the whois more than once
  console.log(req)
  const state = yield select()
  const { meta } = state.whois
  //if (!(req.payload.domain in meta)) {
    yield put( W.requestWhois(req) )
    const msg = yield call(fetchWhois, req)
    console.log(msg)
    yield put( W.receiveWhois(msg) )
  //}
}

export function fetchWhois(req) {
  const { domain } = req.payload

  console.log('fetchwhois: ' + ('/whois/' + domain))

  return fetch('/whois/' + domain).then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}