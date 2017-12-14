// @flow
import { handleActions } from "redux-actions";
import * as B from "../actions/books"

const initialState = {
  book: '',
  bookComp: '',
  dataList: [],
  isFetchingList: false,
  dataSummary: {},
  isFetchingSummary: false,
  dataSearch: {},
  dataSearchComp: {},
  isFetchingSearch: false,
  isFetchingSearchComp: false,
}

export default handleActions({
  [B.SWAP_BOOKS]: (state = { }) => {
    console.log(state)
    const { bookComp, book, dataSearchComp, dataSearch } = state
    return {
      ...state,
      book: bookComp,
      bookComp: book,
      dataSearch: dataSearchComp,
      dataSearchComp: dataSearch,
    }
  },
  [B.NAV_BOOKS]: (state = { }, action) => ({
    ...state,
    book: action.payload.book
  }),
  [B.NAV_BOOKS_COMP]: (state = { }, action) => ({
    ...state,
    bookComp: action.payload.book
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
  [B.REQ_SEARCH_BOOKS_COMP]: (state = { }) => ({
    ...state,
    isFetchingSearchComp: true,
  }),
  [B.REC_SEARCH_BOOKS]: (state = { }, action) => ({
    ...state,
    isFetchingSearch: false,
    dataSearch: JSON.parse(action.payload.data)
  }),
  [B.REC_SEARCH_BOOKS_COMP]: (state = { }, action) => ({
    ...state,
    isFetchingSearchComp: false,
    dataSearchComp: JSON.parse(action.payload.data)
  })
}, initialState);