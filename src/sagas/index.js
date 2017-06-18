// @flow
import { fork } from "redux-saga/effects"
import { login, logout } from "./user"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(login),
    fork(logout)
  ];
}
