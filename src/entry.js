// @flow
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "./store/configure-store";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Root from './containers/Root'

injectTapEventPlugin()
const store = configureStore(hashHistory);
const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <MuiThemeProvider>
    <Root store={store} history={history} />
  </MuiThemeProvider>
);

render(
  <App />,
  document.getElementById("react-root")
);
