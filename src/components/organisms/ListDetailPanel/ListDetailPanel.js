// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Card } from 'material-ui/Card'
import { HCCPanel } from "../../../components/molecules"
import { ClickActionButton } from "../../../components/atoms"
import { SECTION_COLORS } from "../../../constants/application"
import ContentClear from "material-ui/svg-icons/content/clear"

import styles from "./styles.css"

export class ListDetailPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idx: props.idx,
      pos: 0,
      generateTabDOM: (tab, idx) => (
        <ClickActionButton key={ idx } action={ () => this.setState({ pos: idx }) } className={ styles.detail }
          style={{ "width" : parseInt(90 / props.nav.length) + "%", "background" : SECTION_COLORS[idx * 2] }}
          tooltip={ tab.name } > { tab.nav } </ClickActionButton>)
    }
  }

  render() {
    const { idx, generateTabDOM, pos } = this.state
    const { data, dataKey, showKey, click, nav, cont } = this.props
    const self = this
    console.log('render')

    return (
      <div className={ styles.root }>
        <Card className={ styles.card }>
          <div className={ styles.left }>
            { data.map((dat, index)=> <div key={ index } onClick={ ()=> { self.setState({ idx: index }); self.setState({ pos: 0 }); } }
              className={ styles.item + (dat[dataKey] === data[idx][dataKey] ? " " + styles.active : "") }>{ dat[showKey] }</div> )}
          </div>
          <div className={ styles.right }>
            <div className={ styles.top }>
              { nav.map(generateTabDOM) }
              <ClickActionButton action={ click } className={ styles.close }> <ContentClear/> </ClickActionButton>
            </div>
            <div className={ styles.bottom }>
            { cont[pos](data[idx]) }
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

/*
  {
    Object.keys(data[idx]).map(function(key, index){
      return <div key={ index }><strong>{ key }: </strong>{ data[idx][key] }</div>
    })
  }
*/

ListDetailPanel.propTypes = {
  click: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  idx: PropTypes.number.isRequired,
  dataKey: PropTypes.string.isRequired,
  showKey: PropTypes.string.isRequired,
  nav: PropTypes.array.isRequired,
  cont: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(ListDetailPanel)