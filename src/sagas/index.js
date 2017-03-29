// @flow
import { fork } from "redux-saga/effects";
import counterSaga from "./counter";
import { login, logout } from "./user";

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(counterSaga),
    fork(login),
    fork(logout)
  ];
}
