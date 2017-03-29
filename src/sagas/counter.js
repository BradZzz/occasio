// @flow
import { takeEvery, delay } from "redux-saga"
import { put, call } from "redux-saga/effects"
import * as C from "../actions/counter"

export function *incrementAsync(): Generator<*, *, *> {
  yield call(delay, 1000)
  yield put(C.increment())
}

export default function *counterSaga(): Generator<*, *, *> {
  yield [
    takeEvery(C.INCREMENT_ASYNC, incrementAsync)
  ]
}