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

export function* queryCreateAuction(req) {
  yield takeEvery(A.QUERY_CREATEAUCTION, postCreateAuction)
}

export function* postCreateAuction(req) {
  yield put( A.requestCreateAuction(req) )
  const msg = yield call(submitCreateAuction, req)
  console.log(msg)
  yield put( A.receiveCreateAuction(msg) )
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

export function submitCreateAuction(req) {
  const { payload } = req
  console.log(JSON.parse(payload))
  return fetch("/auctions/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: payload

    }).then(function(response) {
      console.log(response)
      if (response.status >= 400) {
        console.log("Bad response from server: " + response.status)
        return []
      }
      return response.json()
    })
}