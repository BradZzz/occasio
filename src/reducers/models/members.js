// @flow
import { handleActions } from "redux-actions";
import * as M from "../../actions/models/members"

const initialState = {
  data: [],
  unique: [],
  isFetching: false,
}

export default handleActions({
  [M.REQUEST_MEMBERS_MODEL]: (state = { }) => ({
    ...state,
    isFetching: true,
  }),
  [M.RECEIVE_MEMBERS_MODEL]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    data: action.payload.data,
    unique: action.payload.unique
  }),
}, initialState);