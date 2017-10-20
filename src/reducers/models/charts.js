// @flow
import { handleActions } from "redux-actions";
import * as C from "../../actions/models/charts"

const initialState = {
  data: {},
  isFetching: false,
}

export default handleActions({
  [C.REQUEST_CHART_MODEL]: (state = { }) => ({
    ...state,
    isFetching: true,
  }),
  [C.RECEIVE_CHART_MODEL]: (state = { }, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
  }),
}, initialState);