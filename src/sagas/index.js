// @flow
import { fork } from "redux-saga/effects"
import { login, logout } from "./user"
import { queryS3 } from "./s3"
import { queryListBooks, querySummaryBooks, querySearchBooks, querySearchBooksComp } from "./books"

import { queryFeed } from "./partials/home"

import { requestMembers, queryMembers } from "./models/members"
import { requestProviders, queryProviders } from "./models/providers"
import { requestCampaigns, queryCampaigns } from "./models/campaigns"
import { queryDx } from "./models/dxs"
import { queryHcc } from "./models/hccs"
import { queryChart } from "./models/charts"

export default function *rootSaga(): Generator<*, *, *> {
  yield [
    fork(login),
    fork(logout),
//    fork(queryFeed),
//    fork(queryS3),
    fork(queryListBooks),
    fork(querySummaryBooks),
    fork(querySearchBooks),
    fork(querySearchBooksComp),

    /*
      Run two forks for each model.
      The first fork is for the initial load.
      The second fork is for the refresh.
    */

//    fork(requestMembers),
//    fork(queryMembers),
//
//    fork(requestProviders),
//    fork(queryProviders),
//
//    fork(requestCampaigns),
//    fork(queryCampaigns),

    /*
      These models require a member.
      We will cache these as necessary, but will not load on start.
    */
//    fork(queryDx),
//    fork(queryHcc),
//    fork(queryChart),
  ];
}
