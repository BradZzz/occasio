// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from "./user";
import nav from "./nav";

import p_home from "./partials/home";
import p_dash from "./partials/dashboard";
import p_members from "./partials/members";

import m_members from "./models/members";
import m_providers from "./models/providers";

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  nav,
  p_home,
  p_dash,
  p_members,
  m_members,
  m_providers,
});

export default rootReducer;
