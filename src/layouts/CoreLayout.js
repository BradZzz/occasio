// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"


import { Link } from "react-router";
import styles from "./CoreLayout.css";
import { HeaderPanel, NavPanel } from "../components/organisms/"

export class CoreLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      children: props.children,
      book: props.book
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.book) !== JSON.stringify(nextProps.book))
    {
      this.setState({ book: nextProps.book })
    }
  }

  render() {
    const { children } = this.props
    const { book } = this.state;
    const mRight = book ? styles.right : styles.rightAlt

    console.log('children', children)

    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <NavPanel></NavPanel>
        </div>
        <div className={mRight}>
          <HeaderPanel></HeaderPanel>
          <div className={styles.frame}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}


CoreLayout.propTypes = {
  book: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { book } = state.books
  return {
    book
  }
}

export default connect(mapStateToProps)(CoreLayout)
