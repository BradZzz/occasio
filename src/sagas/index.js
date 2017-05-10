// @flow
import { fork } from "redux-saga/effects"
import counterSaga from "./counter"
import { login, logout } from "./user"
import { queryDomains } from "./domain"
import { queryAuctions, queryCreateAuction } from "./auction"
import { queryBids, queryCreateBids, postCreateBids } from "./bids"
import { queryWhois } from "./whois"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(counterSaga),
    fork(login),
    fork(logout),
    fork(queryDomains),
    fork(queryAuctions),
    fork(queryCreateAuction),
    fork(queryBids),
    fork(queryCreateBids),
    fork(queryWhois),
  ];
}
