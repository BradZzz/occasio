// @flow
import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from "./layouts/CoreLayout";
import {
  LoginPage,
  HomePage,
} from "./containers/pages/";

import type { Store } from "redux";

const getRoutes = (store: Store<*, *>) => {
  return (
    <Route path="/" component={ CoreLayout }>
      <IndexRoute component={ LoginPage } />
      <Route path="/home" component={ HomePage } />
    </Route>
  );
};


export default getRoutes;
