// @flow
import { handleActions } from "redux-actions";
import * as U from "../actions/auction"

const initialState = {
  meta: [],
  details: false,
  isFetching: false,
  bidding: false,
  specific: { name: '', expires: '', bids: [{ uuid : '', bid : 0, placed: '' }] },
  errorMsg: "",
}

const sortArr = (arr, field, asc = true) => {
  return arr.sort((a, b) => {
    if(a[field] < b[field]) { return asc ? -1 : 1 }
    if(a[field] > b[field]) { return asc ? 1 : -1 }
    return 0
  })
}

export default handleActions({
  [U.REQUEST_AUCTIONS]: (state = { }, action) => ({
    ...state,
    isFetching: true,
    period: parseInt(action.payload.period),
    errorMsg: ""
  }),
  [U.RECEIVE_AUCTIONS]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    meta: action.payload,
    errorMsg: ""
  }),
  [U.SORT_AUCTIONS_NAME]: (state = { }, action) => ({
    ...state,
    meta: sortArr(state.meta, 'name', action.payload.asc)
  }),
  [U.SORT_AUCTIONS_EXP]: (state = { }, action) => ({
    ...state,
    meta: sortArr(state.meta, 'expires', action.payload.asc)
  }),
  [U.NAV_AUCTIONS_SPECIFIC]: (state = { }, action) => ({
    ...state,
    details: true,
    bidding: false,
    specific: action.payload.specific,
  }),
  [U.NAV_AUCTIONS_SPECIFIC_REV]: (state = { }, action) => ({
    ...state,
    details: true,
    bidding: false,
  }),
  [U.NAV_AUCTIONS_GENERAL]: (state = { }) => ({
    ...state,
    details: false,
    bidding: false,
    specific: initialState.specific,
  }),
  [U.NAV_AUCTIONS_BID]: (state = { }) => ({
    ...state,
    details: false,
    bidding: true,
  }),
}, initialState);