// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as H from "../../actions/partials/home"
import fetch from 'isomorphic-fetch'

const FEED_TYPES = ["Bug Fix", "Feature"]

export function* queryFeed(req) {
  yield takeEvery(H.FEED_QUE, requestFeed)
}

export function* requestFeed(req) {
  yield put( H.feedReq(req) )
  const msg = yield call(fetchFeed, req)
  console.log(msg)
  yield put( H.feedRec(msg) )
}

export function fetchFeed(req) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([
        { type: FEED_TYPES[0], msg: "Display loading members page", created: new Date() },
        { type: FEED_TYPES[1], msg: "New filter for age for providers", created: new Date() },
        { type: FEED_TYPES[1], msg: "New download demographics page", created: new Date() },
        { type: FEED_TYPES[0], msg: "Fixed problems with forgotten passwords", created: new Date() },
        { type: FEED_TYPES[1], msg: "Added new feature feeds", created: new Date() }
      ])
    }, 5000)
  })
}