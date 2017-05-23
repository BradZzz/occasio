// @flow
import { handleActions } from "redux-actions";
import * as N from "../actions/namespace"

const initialState = {
  metaBackorder: {},
  metaOrder: {},
  isFetchingBackorder: false,
  isFetchingOrder: false,
  lastFetched: new Date(),
}

export default handleActions({
  [N.REQUEST_BACKORDERS]: (state = { }, action) => ({
    ...state,
    isFetchingBackorder: true,
  }),
  [N.RECEIVE_BACKORDERS]: (state = { }, action) => ({
    ...state,
    isFetchingBackorder: false,
    metaBackorder: action.payload,
    lastFetched: new Date(),
  }),
  [N.REQUEST_ORDERS]: (state = { }, action) => ({
    ...state,
    isFetchingOrder: true,
  }),
  [N.RECEIVE_ORDERS]: (state = { }, action) => ({
    ...state,
    isFetchingOrder: false,
    metaOrder: action.payload,
    lastFetched: new Date(),
  })
}, initialState);