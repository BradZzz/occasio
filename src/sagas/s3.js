// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as S3 from "../actions/s3"

import fetch from 'isomorphic-fetch'

export function* queryS3(req) {
  yield takeEvery(S3.QUERY_S3, requestS3)
}

export function* requestS3(req) {
  console.log(req.payload)
  if ('key' in req.payload) {
    yield put( S3.s3Req(req) )
    yield call(checkS3, req.payload.key)
    yield put( S3.s3Rec( { data: 'sent' } ))
  }
}

function checkS3(key) {
  const check = '/download/check?key=' + key
  return fetch(check).then(function(response) {
    if (response.status >= 400) {
      alert("Bad response from server: " + response.status)
      return []
    }
    response.json().then((data) => {
      if (data.available) {
        const url = '/download/chart?key=' + key
        const redirectWindow = window.open(url, '_blank')
        redirectWindow.location
        return []
      } else {
        /*
          TODO: There needs to be a better alert here when this happens
        */
        alert('Oh no! This chart has been moved! Please contact an Episource service representative if you need help tracking it down!')
        return []
      }
    })
  })
}