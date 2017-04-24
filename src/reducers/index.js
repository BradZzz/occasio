// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import user from "./user";
import domain from "./domain";
import auction from "./auction";
import whois from "./whois";

const rootReducer = combineReducers({
  routing: routerReducer,
  counter,
  user,
  domain,
  auction,
  whois
});

export default rootReducer;
