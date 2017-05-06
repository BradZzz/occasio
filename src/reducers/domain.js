// @flow
import { handleActions } from "redux-actions";
import * as U from "../actions/domain"

const initialState = {
  meta: [],
  metaApp: [],
  period: 30,
  details: false,
  isFetching: false,
  isFetchingApp: false,
  specific: "",
  errorMsg: "",
  specObj: "{}",
  lastFetched: new Date(),
  lastFetchedApp: new Date(),
}

const sortArr = (arr, field, asc = true) => {
  return arr.sort((a, b) => {
    if(a[field] < b[field]) { return asc ? -1 : 1 }
    if(a[field] > b[field]) { return asc ? 1 : -1 }
    return 0
  })
}

const sortArrNum = (arr, field, asc = true) => {
  return arr.sort((a, b) => {
//    if(a[field] < b[field]) { return asc ? -1 : 1 }
//    if(a[field] > b[field]) { return asc ? 1 : -1 }
//    return 0
    return asc ? a[field] - b[field] : b[field] - a[field]
  })
}

export default handleActions({
  [U.REQUEST_DOMAINS]: (state = { }, action) => ({
    ...state,
    isFetching: true,
    period: 30,
    errorMsg: ""
  }),
  [U.RECEIVE_DOMAINS]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    meta: action.payload,
    errorMsg: "",
    lastFetched: new Date()
  }),
  [U.REQUEST_APPRAISALS]: (state = { }, action) => ({
    ...state,
    isFetchingApp: true,
  }),
  [U.RECEIVE_APPRAISALS]: (state = { }, action) => ({
    ...state,
    isFetchingApp: false,
    metaApp: action.payload,
    lastFetchedApp: new Date()
  }),
  [U.SORT_DOMAIN_NAME]: (state = { }, action) => ({
    ...state,
    meta: sortArr(state.meta, 'name', action.payload.asc)
  }),
  [U.SORT_DOMAIN_APP]: (state = { }, action) => ({
    ...state,
    meta: sortArrNum(state.meta, 'value', action.payload.asc)
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