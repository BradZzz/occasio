// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as P from "../../actions/models/providers"

import { findDistinct } from "../../constants/application"
import fetch from 'isomorphic-fetch'

export function* queryProviders(req) {
  yield takeEvery(P.QUERY_PROVIDERS_MODEL, requestProviders)
}

export function* requestProviders(req) {
  yield put( P.providersReq(req) )
  const msg = yield call(fetchProviders, req)
  console.log(msg.data)

  yield put( P.providersRec( { data: msg.data, unique: findDistinct(msg.data,'provider_id') } ))
}

export function fetchProviders(req) {
  return fetch('/providers').then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}