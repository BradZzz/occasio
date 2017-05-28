// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as N from "../actions/namespace"
import fetch from 'isomorphic-fetch'

//export function* queryBids(req) {
//  yield takeEvery(N.QUERY_BIDS, requestBids)
//}

export function* queryBackorder(req) {
  yield takeEvery(N.QUERY_BACKORDERS, postCreateBackorder)
}

export function* postCreateBackorder(req) {
  console.log(req.payload.domName)
  yield put( N.requestBackorder(req.payload) )
  const msg = yield call(submitCreateBackorder, req)
  console.log(msg)
  yield put( N.receiveBackorder(msg) )
}

/*
POST must contain: domName, usrID
*/

export function submitCreateBackorder(req) {
  console.log(req)
  console.log(req.payload)
  console.log(req.payload.domName)
  const payload = Object.assign({}, req.payload, { action : 'backorder' })
  console.log(payload)

  return fetch("/namespace/action", {
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