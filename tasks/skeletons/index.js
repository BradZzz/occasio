/* eslint-disable */
exports.css = name => `.root {
  /* TODO: ${name} styles. */
}`;


exports.uiComponent = name => `// @flow
import React, { Component } from "react";
import styles from "./${name}.css";


type Props = {
};

type State = {
};

export default class ${name} extends Component {
  props: Props;
  state: State;

  render() {
    return (
      <div className={styles.root}>
        ${name}
      </div>
    );
  }
}
`;


exports.uiFunctionalComponent = name => `// @flow
import React from "react";
import styles from "./${name}.css";

type Props = {
};

const ${name} = (props: Props) => {
  const {
    ...
  } = props;

  return (
    <div className={styles.root}>
      ${name}
    </div>
  );
};

export default ${name};
`;


exports.uiComponentSpec = name => `import assert from "power-assert";
import sinon from "sinon";
import React from "react";
import { mount } from "enzyme";
import ${name} from "./${name}";


describe("<${name} />", () => {
  it("Should be writing tests for ${name} component", () => {
    // TODO: Writing tests.
  });
});
`;


exports.uiComponentExample = name => `Basic:

\`\`\`
<${name} />
\`\`\`
`;


exports.containerUI = name => `// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./${name}.css";

import type { Dispatch } from "redux";


type Props = {
  dispatch: Dispatch<*>;
};

export class ${name} extends Component {
  props: Props;

  render() {
    return (
      <div className={styles.root}>
        ${name}
      </div>
    );
  }
}


export default connect(
  state => state
)(${name});
`;


exports.containerPage = name => `// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "../../../components/utils/Helmet";
import styles from "./${name}.css";

import type { Dispatch } from "redux";


type Props = {
  dispatch: Dispatch<*>;
};

export class ${name} extends Component {
  props: Props;

  render() {
    return (
      <div className={styles.root}>
        <Helmet title="TODO: Title" />

        ${name}
      </div>
    );
  }
}


export default connect(
  state => state
)(${name});
`;
