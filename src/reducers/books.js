// @flow
import { handleActions } from "redux-actions";
import * as B from "../actions/books"

const initialState = {
  book: '',
  dataList: [],
  isFetchingList: false,
  dataSummary: {},
  isFetchingSummary: false,
  dataSearch: {},
  isFetchingSearch: false,
}

export default handleActions({
  [B.NAV_BOOKS]: (state = { }, action) => ({
    ...state,
    book: action.payload.book
  }),
  [B.REQ_LIST_BOOKS]: (state = { }) => ({
    ...state,
    isFetchingList: true,
  }),
  [B.REC_LIST_BOOKS]: (state = { }, action) => ({
    ...state,
    isFetchingList: false,
    dataList: action.payload.data
  }),
  [B.REQ_SUMMARY_BOOKS]: (state = { }) => ({
    ...state,
    isFetchingSummary: true,
  }),
  [B.REC_SUMMARY_BOOKS]: (state = { }, action) => ({
    ...state,
    isFetchingSummary: false,
    dataSummary: JSON.parse(action.payload.data)
  }),
  [B.REQ_SEARCH_BOOKS]: (state = { }) => ({
    ...state,
    isFetchingSearch: true,
  }),
  [B.REC_SEARCH_BOOKS]: (state = { }, action) => ({
    ...state,
    isFetchingSearch: false,
    dataSearch: JSON.parse(action.payload.data)
  }),
}, initialState);