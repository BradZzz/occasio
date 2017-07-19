// @flow
import { fork } from "redux-saga/effects"
import { login, logout } from "./user"

import { queryFeed } from "./partials/home"

import { requestMembers, queryMembers } from "./models/members"
import { requestProviders, queryProviders } from "./models/providers"
import { requestCampaigns, queryCampaigns } from "./models/campaigns"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(login),
    fork(logout),
    fork(queryFeed),

    //We request the info first here
    fork(requestMembers),
    //Keep the query on the back-burner in case we need to refresh
    fork(queryMembers),

    fork(requestProviders),
    fork(queryProviders),

    fork(requestCampaigns),
    fork(queryCampaigns),
  ];
}
