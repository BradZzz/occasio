// @flow
import { handleActions } from "redux-actions";
import * as H from "../../actions/models/hccs"

const initialState = {
  data: {},
  isFetching: false,
}

export default handleActions({
  [H.REQUEST_HCC_MODEL]: (state = { }) => ({
    ...state,
    isFetching: true,
  }),
  [H.RECEIVE_HCC_MODEL]: (state = { }, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
  }),
}, initialState);