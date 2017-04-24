// @flow
import { handleActions } from "redux-actions";
import * as W from "../actions/whois"

const initialState = {
  meta: {},
  isFetching: false,
}

export default handleActions({
  [W.REQUEST_WHOIS]: (state = { }, action) => ({
    ...state,
    isFetching: true,
  }),
  [W.RECEIVE_WHOIS]: (state = { }, action) => {
    return Object.assign({}, state, {
      meta: Object.assign({}, state.meta, action.payload)
    })
  },
}, initialState)