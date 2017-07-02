// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import FlatButton from 'material-ui/FlatButton'
import Collapsible from 'react-collapsible'
import styles from "./styles.css"

export class Collapse extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { trigger, children, open } = this.props
    return (
      <div className={ styles.root }>
        <Collapsible trigger={ trigger } open={ open || false }>
           { children }
        </Collapsible>
      </div>
    );
  }
}

Collapse.propTypes = {
    trigger: PropTypes.string.isRequired,
    open: PropTypes.boolean,
}
function mapStateToProps(state) { return { } }
export default connect(mapStateToProps)(Collapse)