// @flow
import { fork } from "redux-saga/effects"
import counterSaga from "./counter"
import { login, logout } from "./user"
import { queryDomains, queryAppraisals } from "./domain"
import { queryAuctions } from "./auction"
import { queryWhois } from "./whois"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(counterSaga),
    fork(login),
    fork(logout),
    fork(queryAppraisals),
    fork(queryDomains),
    fork(queryAuctions),
    fork(queryWhois),
  ];
}
