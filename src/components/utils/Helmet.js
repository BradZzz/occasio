// @flow
import React from "react";
import ReactHelmet from "react-helmet";
import { APP_NAME } from "../../constants/application";

const Helmet = (props: any) => (
  <ReactHelmet
    titleTemplate={`%s - ${APP_NAME}`}
    {...props}
  />
);

export default Helmet;
