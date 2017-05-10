// @flow
import { handleActions } from "redux-actions";
import * as U from "../actions/bids"

const initialState = {
  meta: {},
  metaCB: {},
  isFetching: false,
  isFetchingCB: false,
  lastFetched: new Date(),
}

export default handleActions({
  [U.REQUEST_BIDS]: (state = { }, action) => ({
    ...state,
    isFetching: true,
  }),
  [U.RECEIVE_BIDS]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    meta: action.payload,
  }),
  [U.REQUEST_CREATEBIDS]: (state = { }, action) => ({
    ...state,
    isFetchingCB: true,
  }),
  [U.RECEIVE_CREATEBIDS]: (state = { }, action) => ({
    ...state,
    isFetchingCB: false,
    metaCB: action.payload,
  })
}, initialState);