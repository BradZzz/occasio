// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as C from "../../actions/models/campaigns"

import { findDistinct } from "../../constants/application"
import fetch from 'isomorphic-fetch'

export function* queryCampaigns(req) {
  yield takeEvery(C.QUERY_CAMPAIGNS_MODEL, requestCampaigns)
}

export function* requestCampaigns(req) {
  yield put( C.campaignsReq(req) )
  const msg = yield call(fetchCampaigns, req)
  console.log(msg.data)

  yield put( C.campaignsRec( { data: msg.data, unique: findDistinct(msg.data,'name') } ))
}

export function fetchCampaigns(req) {
  return fetch('/campaigns').then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}