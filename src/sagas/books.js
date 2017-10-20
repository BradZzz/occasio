// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call, fork } from "redux-saga/effects"
import * as B from "../actions/books"

import fetch from 'isomorphic-fetch'

const base = 'https://gbmgev5y37.execute-api.us-east-1.amazonaws.com/deploy'

export function* queryListBooks(req) {
  yield takeEvery(B.QUERY_LIST_BOOKS, requestListBooks)
}

export function* requestListBooks(req) {
  yield put( B.reqListBooks(req) )
  const msg = yield call(fetchBookList, req)
  console.log(msg)
  yield put( B.recListBooks( { data: msg } ))
}

export function fetchBookList(req) {
  return fetch(base + '/list').then(r => {
      return r.json()
    }).then(data => {
      return data
    }).catch(e => {
      console.log(e)
      return []
    })
}

export function* querySummaryBooks(req) {
  yield takeEvery(B.QUERY_SUMMARY_BOOKS, requestSummaryBooks)
}

export function* requestSummaryBooks(req) {
  yield put( B.reqSummaryBooks(req) )
  const msg = yield call(fetchBookSummary, req)
  console.log(msg)
  yield put( B.recSummaryBooks( { data: msg } ))
}

export function fetchBookSummary(req) {
  return fetch(base + '/summary').then(r => {
      return r.json()
    }).then(data => {
      return data
    }).catch(e => {
      console.log(e)
      return []
    })
}

export function* querySearchBooks(req) {
  yield takeEvery(B.QUERY_SEARCH_BOOKS, requestSearchBooks)
}

export function* requestSearchBooks(req) {
  console.log(req)
  yield put( B.reqSearchBooks(req) )
  yield put( B.navBooks({ book: req.payload.book }) )
  const msg = yield call(fetchSearchBook, req)
  console.log(msg)
  yield put( B.recSearchBooks( { data: msg } ))
}

export function fetchSearchBook(req) {
  return fetch(base + '/book?name=' + req.payload.book).then(r => {
      return r.json()
    }).then(data => {
      return data
    }).catch(e => {
      console.log(e)
      return []
    })
}