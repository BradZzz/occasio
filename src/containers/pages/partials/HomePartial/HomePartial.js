// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"
import * as HomeActions from "../../../../actions/partials/home"
import { FoldingCubeHome } from "../../../../components/atoms"
import Divider from 'material-ui/Divider';

export class HomePartial extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, feed } = this.props
    if (feed.length === 0) {
      dispatch(HomeActions.queryFeed())
    }
  }

  list = (part,idx) => {
    return (<div key={ idx } className={styles.parent}>
        <div className={styles.container}>
          <span className={styles.item}>{part.msg}</span>
          <span className={styles.item + " " + styles.bold}>{part.created.toString()}</span>
        </div>
        <Divider />
    </div>)
  }

  render() {
    const { feed } = this.props
    console.log(feed)
    return (
      <div className={styles.root}>
        <h3>Feed</h3>
        <FoldingCubeHome/>
        { feed.map(this.list) }
      </div>
    )
  }
}

HomePartial.propTypes = {
  feed: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { feed } = state.p_home
  return { feed }
}

export default connect(mapStateToProps)(HomePartial)