// @flow
import { fork } from "redux-saga/effects"
import { login, logout } from "./user"

import { queryFeed } from "./partials/home"

import { queryMembers } from "./models/members"
import { queryProviders } from "./models/providers"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(login),
    fork(logout),
    fork(queryFeed),
    fork(queryMembers),
    fork(queryProviders),
  ];
}
