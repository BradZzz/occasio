// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from "./user";
import nav from "./nav";

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  nav
});

export default rootReducer;
