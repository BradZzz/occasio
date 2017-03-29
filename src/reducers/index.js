// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import user from "./user";

const rootReducer = combineReducers({
  routing: routerReducer,
  counter,
  user
});

export default rootReducer;
