// @flow
import { fork } from "redux-saga/effects"
import counterSaga from "./counter"
import { login, logout } from "./user"
import { queryDomains } from "./domain"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(counterSaga),
    fork(login),
    fork(logout),
    fork(queryDomains)
  ];
}
