// @flow
import { handleActions } from "redux-actions";
import * as S3 from "../actions/s3"

const initialState = {
  data: {},
  isFetching: false,
}

export default handleActions({
  [S3.S3_REQ]: (state = { }) => ({
    ...state,
    isFetching: true,
  }),
  [S3.S3_REC]: (state = { }, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
  }),
}, initialState);