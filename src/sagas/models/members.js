// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as M from "../../actions/models/members"

import { findDistinct } from "../../constants/application"
import fetch from 'isomorphic-fetch'

export function* queryMembers(req) {
  yield takeEvery(M.QUERY_MEMBERS_MODEL, requestMembers)
}

export function* requestMembers(req) {
  yield put( M.memberReq(req) )
  const msg = yield call(fetchMembers, req)
  console.log(msg.data)

  yield put( M.memberRec( { data: msg.data, unique: findDistinct(msg.data,'hicn') } ))
}

export function fetchMembers(req) {
  return fetch('/members').then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}