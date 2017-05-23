// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as B from "../actions/bids"
import fetch from 'isomorphic-fetch'

export function* queryBids(req) {
  yield takeEvery(B.QUERY_BIDS, requestBids)
}

export function* queryCreateBids(req) {
  yield takeEvery(B.QUERY_CREATEBIDS, postCreateBid)
}

export function* requestBids(req) {
  yield put( B.requestBids(req) )
  const msg = yield call(fetchBids, req)
  console.log(msg)
  const bidMap = {}
  msg.map((mg)=>{
    if (!(mg.domID in bidMap)) {
      bidMap[mg.domID] = []
    }
    bidMap[mg.domID].push(mg)
  })
  yield put( B.receiveBids(bidMap) )
}

export function* postCreateBid(req) {
  yield put( B.requestCreateBids(req) )
  const msg = yield call(submitCreateBid, req)
  console.log(msg)
  yield put( B.receiveCreateBids(msg) )
}


export function fetchBids(req) {
  return fetch('/bids/get').then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}

/*

POST must contain: domID, amount, usrID

*/
export function submitCreateBid(req) {
  const { payload } = req
  console.log(payload)
  return fetch("/bids/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(function(response) {
      console.log(response)
      if (response.status >= 400) {
        console.log("Bad response from server: " + response.status)
        return []
      }
      return response.json()
    })
}