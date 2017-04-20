// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as A from "../actions/auction"
import fetch from 'isomorphic-fetch'

export function* queryAuctions(req) {
  yield takeEvery(A.QUERY_AUCTIONS, requestA)
}

export function* requestA(req) {
  yield put( A.requestAuctions(req) )
  const msg = yield call(fetchAuctions, req)
  console.log(msg)
  yield put( A.receiveAuctions(msg) )
}


export function fetchAuctions(req) {
  return fetch('/auctions/get').then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}