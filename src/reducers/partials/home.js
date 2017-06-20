// @flow
import { handleActions } from "redux-actions";
import * as H from "../../actions/partials/home"
import React from "react"

const initialState = {
  isFetching: false,
  lastFetched: null,
  feed: [ ],
}

export default handleActions({
  [H.FEED_REQ]: (state = { }) => ({
    ...state,
    isFetching: true,
  }),
  [H.FEED_REC]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    feed: action.payload,
    lastFetched: new Date(),
  }),
}, initialState);