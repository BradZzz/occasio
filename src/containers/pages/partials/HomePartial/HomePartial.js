// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import * as BookActions from "../../../../actions/books"

import { FoldingCubeHome } from "../../../../components/atoms"
import { BookPanel } from "../../../../components/organisms"

import { Card } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export class HomePartial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: props.book,
      dataSearch: props.dataSearch,
      isFetchingSearch: props.isFetchingSearch
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.book) !== JSON.stringify(nextProps.book))
    {
      this.setState({ book: nextProps.book })
    }
    if(JSON.stringify(this.state.dataSearch) !== JSON.stringify(nextProps.dataSearch))
    {
      this.setState({ dataSearch: nextProps.dataSearch })
    }
    if(JSON.stringify(this.state.isFetchingSearch) !== JSON.stringify(nextProps.isFetchingSearch))
    {
      this.setState({ isFetchingSearch: nextProps.isFetchingSearch })
    }
  }

  componentDidMount() {
    const { dispatch, dataList } = this.props
    if (dataList.length === 0) {
      dispatch(BookActions.queryListBooks())
      dispatch(BookActions.querySummaryBooks())
    }
  }

  action = (part) => {
    const { dispatch } = this.props
    console.log(part)
    dispatch( BookActions.querySearchBooks({ book: part }) )
  }

  list = (part,idx) => {
    const base = part.split('_')
    return (<div key={ idx } className={styles.parent} onClick={() => { this.action(part) } } style={{ cursor: "pointer" }}>
        <div className={styles.container}>
          <span className={styles.item}>{base[0] + " - " + base[1].replace("(analysis).json","")}</span>
        </div>
        <Divider />
    </div>)
  }

  render() {
    const { dataList, dataSummary } = this.props
    const { book, dataSearch, isFetchingSearch } = this.state

    let bView = book ? <BookPanel /> : dataList.map(this.list)

    return (
      <div className={styles.root}>
        <FoldingCubeHome/>
        <div style={{ "marginBottom":"5em" }}>
          { bView }
        </div>
      </div>
    )
  }
}

HomePartial.propTypes = {
  book: PropTypes.string.isRequired,
  dataList: PropTypes.array.isRequired,
  isFetchingList: PropTypes.bool.isRequired,
  dataSearch: PropTypes.object.isRequired,
  isFetchingSearch: PropTypes.bool.isRequired,
  dataSummary: PropTypes.object.isRequired,
  isFetchingSummary: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { book, dataList, isFetchingList, dataSearch, isFetchingSearch, dataSummary, isFetchingSummary } = state.books
  return { book, dataList, isFetchingList, dataSearch, isFetchingSearch, dataSummary, isFetchingSummary }
}

export default connect(mapStateToProps)(HomePartial)