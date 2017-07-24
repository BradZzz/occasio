// @flow
import { handleActions } from "redux-actions";
import * as C from "../../actions/models/campaigns"

const initialState = {
  data: [],
  unique: [],
  isFetching: false,
}

export default handleActions({
  [C.REQUEST_CAMPAIGNS_MODEL]: (state = { }) => ({
    ...state,
    isFetching: true,
  }),
  [C.RECEIVE_CAMPAIGNS_MODEL]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    data: action.payload.data,
    unique: action.payload.unique
  }),
}, initialState);