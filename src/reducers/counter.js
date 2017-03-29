// @flow
import { handleActions } from "redux-actions";
import * as C from "../actions/user";

const initialState = {
  count: 0
};

export default handleActions({
  [C.INCREMENT]: state => ({
    ...state,
    count: state.count + 1
  }),

  [C.DECREMENT]: state => ({
    ...state,
    count: state.count - 1
  })
}, initialState);
