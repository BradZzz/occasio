// @flow
import { handleActions } from "redux-actions";
import * as U from "../actions/user"
import { BLANK_USR } from '../constants/application'

const initialState = {
  meta: BLANK_USR,
  isFetching: false,
  signedIn: false,
  errorMsg: "",
}

export default handleActions({
  [U.REQUEST_LOGIN]: (state = { }) => ({
    ...state,
    isFetching: true,
    errorMsg: ""
  }),
  [U.RECEIVE_LOGIN]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    signedIn: true,
    meta: action.msg,
    errorMsg: ""
  }),
  [U.REQUEST_LOGOUT]: (state = { }) => ({
    ...state,
    isFetching: true,
    errorMsg: ""
  }),
  [U.RECEIVE_LOGOUT]: (state = { }, action) => ({
    ...state,
    isFetching: initialState.isFetching,
    signedIn: initialState.signedIn,
    meta: initialState.meta,
    errorMsg: action.msg
  }),
}, initialState);