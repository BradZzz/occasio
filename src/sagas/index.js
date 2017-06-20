// @flow
import { fork } from "redux-saga/effects"
import { login, logout } from "./user"
import { queryFeed } from "./partials/home"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(login),
    fork(logout),
    fork(queryFeed),
  ];
}
