// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork, select } from "redux-saga/effects"
import * as H from "../../actions/models/hccs"
import fetch from 'isomorphic-fetch'

const getState = state => state.m_hccs

export function* queryHcc(req) {
  yield takeEvery(H.QUERY_HCC_MODEL, requestHcc)
}

export function* requestHcc(req) {
  if ('member' in req.payload) {
    const member = req.payload.member
    const s_hccs = yield select(getState)
    if (!(member in s_hccs)) {
      yield put( H.hccReq(req) )
      const msg = yield call(fetchHcc, req)
      let ret = { data : {} }
      if ('data' in s_hccs){
        ret.data = Object.assign( {}, s_hccs.data)
      }
      ret.data[member] = msg.data
      yield put( H.hccRec( ret ))
    }
  }
}

export function fetchHcc(req) {
  console.log(req)
  const url = '/hccs?member=' + req.payload.member
  return fetch(url).then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}