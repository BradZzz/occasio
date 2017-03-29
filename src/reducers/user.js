// @flow
import { handleActions } from "redux-actions";
import * as U from "../actions/user"

const initialState = {
  meta: {
    email: "",
    first_name: "",
    last_name: "",
  },
  isFetching: false,
  signedIn: false
}

export default handleActions({
  [U.REQUEST_LOGIN]: (state = { }) => ({
    ...state,
    isFetching: true
  }),
  [U.RECEIVE_LOGIN]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    signedIn: true,
    meta: action.msg
  }),
  [U.REQUEST_LOGOUT]: (state = { }) => ({
    ...state,
    isFetching: true
  }),
  [U.RECEIVE_LOGOUT]: (state = { }) => ({
    ...state,
    isFetching: initialState.isFetching,
    signedIn: initialState.signedIn,
    meta: initialState.meta
  }),
}, initialState);