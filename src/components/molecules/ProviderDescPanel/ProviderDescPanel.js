// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Card } from 'material-ui/Card'
import styles from "./styles.css"

import { TableNormal, TableCollapse } from "../../../components/quarks"

import * as ProviderPartialActions from "../../../actions/partials/providers"
import { ClickActionButton } from "../../../components/atoms"

export class ProviderDescPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      desc_load: props.desc_load
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.desc_load) !== JSON.stringify(nextProps.desc_load)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ desc_load: nextProps.desc_load })
    }
  }

  render() {
    const { desc_load } = this.state
    const { data, dispatch } = this.props

    return (
      <div className={ styles.root }>
        <Card className={ styles.card }>
          <div className={ styles.left }>
            { data.map((dat, idx)=> <div key={ idx } onClick={ ()=> dispatch(ProviderPartialActions.loadProviderDesc(dat)) } className={ styles.item + (dat.provider_id === desc_load.provider_id ? " " + styles.active : "") }>{ dat.full_name }</div> )}
          </div>
          <div className={ styles.right }>
            <ClickActionButton action={ click }/>
            {
              Object.keys(desc_load).map(function(key, idx){
                return <div key={ idx }><strong>{ key }: </strong>{ desc_load[key] }</div>
              })
            }
          </div>
        </Card>
      </div>
    )
  }
}

ProviderDescPanel.propTypes = {
  data: PropTypes.array.isRequired,
  desc_load: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { unique:data } = state.m_providers
  const { desc_load } = state.p_providers
  return { data, desc_load }
}

export default connect(mapStateToProps)(ProviderDescPanel)