// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork, select } from "redux-saga/effects"
import * as C from "../../actions/models/charts"

import { findDistinct } from "../../constants/application"
import fetch from 'isomorphic-fetch'

const getState = state => state.m_charts

export function* queryChart(req) {
  yield takeEvery(C.QUERY_CHART_MODEL, requestCharts)
}

export function* requestCharts(req) {
  if ('member' in req.payload) {
    const member = req.payload.member
    const s_chart = yield select(getState)
    if (!(member in s_chart)) {
      yield put( C.chartReq(req) )
      const msg = yield call(fetchChart, req)
      let ret = { data : {} }
      if ('data' in s_chart){
        ret.data = Object.assign( {}, s_chart.data)
      }
      ret.data[member] = msg.data
      yield put( C.chartRec( ret ))
    }
  }
}

export function fetchChart(req) {
  const url = '/charts?member=' + req.payload.member
  return fetch(url).then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return []
    }
    return response.json()
  })
}