// @flow
import { handleActions } from "redux-actions";
import * as D from "../../actions/models/dxs"

const initialState = {
  data: {},
  isFetching: false,
}

export default handleActions({
  [D.REQUEST_DX_MODEL]: (state = { }) => ({
    ...state,
    isFetching: true,
  }),
  [D.RECEIVE_DX_MODEL]: (state = { }, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
  }),
}, initialState);