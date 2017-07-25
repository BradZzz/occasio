// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork, select } from "redux-saga/effects"
import * as D from "../../actions/models/dxs"
import fetch from 'isomorphic-fetch'

const getState = state => state.m_dxs

export function* queryDx(req) {
  yield takeEvery(D.QUERY_DX_MODEL, requestDx)
}

export function* requestDx(req) {
  if ('member' in req.payload) {
    console.log(req.payload)
    const member = req.payload.member
    const s_dxs = yield select(getState)
    console.log(s_dxs)
    if (!(member in s_dxs)) {
      yield put( D.dxReq(req) )
      const msg = yield call(fetchDx, req)
      console.log(s_dxs)
      const ret = { data : {} }
      if ('data' in s_dxs){
        ret.data = Object.assign( {}, s_dxs.data)
      }
      console.log(ret)
      ret.data[member] = msg.data
      yield put( D.dxRec( ret ))
    }
  }
}

export function fetchDx(req) {
  console.log(req)
  const url = '/dxs?member=' + req.payload.member
  return fetch(url).then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}