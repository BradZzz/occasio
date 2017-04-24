// @flow
import { handleActions } from "redux-actions";
import * as U from "../actions/domain"

const initialState = {
  meta: [],
  period: 30,
  details: false,
  isFetching: false,
  specific: "",
  errorMsg: "",
  specObj: "{}",
  lastFetched: new Date()
}

const sortArr = (arr, field, asc = true) => {
  return arr.sort((a, b) => {
    if(a[field] < b[field]) { return asc ? -1 : 1 }
    if(a[field] > b[field]) { return asc ? 1 : -1 }
    return 0
  })
}

export default handleActions({
  [U.REQUEST_DOMAINS]: (state = { }, action) => ({
    ...state,
    isFetching: true,
    period: parseInt(action.payload.period),
    errorMsg: ""
  }),
  [U.RECEIVE_DOMAINS]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    meta: action.payload,
    errorMsg: "",
    lastFetched: new Date()
  }),
  [U.SORT_DOMAIN_NAME]: (state = { }, action) => ({
    ...state,
    meta: sortArr(state.meta, 'name', action.payload.asc)
  }),
  [U.SORT_DOMAIN_EXP]: (state = { }, action) => ({
    ...state,
    meta: sortArr(state.meta, 'expires', action.payload.asc)
  }),
  [U.NAV_DOMAIN_SPECIFIC]: (state = { }, action) => ({
    ...state,
    details: true,
    specific: action.payload.specific,
    specObj: action.payload.specObj,
  }),
  [U.NAV_DOMAIN_GENERAL]: (state = { }) => ({
    ...state,
    details: false,
    specific: "",
  }),
}, initialState);