// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from "./user";
import nav from "./nav";

import p_home from "./partials/home";
import p_dash from "./partials/dashboard";
import p_members from "./partials/members";
import p_providers from "./partials/providers";
import p_campaigns from "./partials/campaigns";

import m_members from "./models/members";
import m_providers from "./models/providers";
import m_campaigns from "./models/campaigns";
import m_dxs from "./models/dxs";
import m_hccs from "./models/hccs";

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  nav,
  p_home,
  p_dash,
  p_members,
  p_providers,
  p_campaigns,
  m_members,
  m_providers,
  m_dxs,
  m_hccs,
  m_campaigns,
});

export default rootReducer;
