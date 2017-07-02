// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from "./user";
import nav from "./nav";

import p_home from "./partials/home";
import p_dash from "./partials/dashboard";

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  nav,
  p_home,
  p_dash,
});

export default rootReducer;
