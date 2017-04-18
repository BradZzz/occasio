// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import user from "./user";
import domain from "./domain";

const rootReducer = combineReducers({
  routing: routerReducer,
  counter,
  user,
  domain
});

export default rootReducer;
