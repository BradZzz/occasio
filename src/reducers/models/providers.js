// @flow
import { handleActions } from "redux-actions";
import * as P from "../../actions/models/providers"

const initialState = {
  data: [],
  isFetching: false,
}

export default handleActions({
  [P.REQUEST_PROVIDERS_MODEL]: (state = { }) => ({
    ...state,
    isFetching: true,
  }),
  [P.RECEIVE_PROVIDERS_MODEL]: (state = { }, action) => ({
    ...state,
    isFetching: false,
    data: action.payload.data,
  }),
}, initialState);