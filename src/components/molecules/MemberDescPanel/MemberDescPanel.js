// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Card } from 'material-ui/Card'
import styles from "./styles.css"

import { TableNormal, TableCollapse } from "../../../components/quarks"
import { ClickActionButton } from "../../../components/atoms"
import * as MembersPartialActions from "../../../actions/partials/members"

export class MemberDescPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.desc_load
    }
  }

  render() {
    const { data } = this.state
    const { dispatch } = this.props
    const click = () => dispatch(MembersPartialActions.unloadMemberDesc({}))

    return (
      <div className={ styles.root }>
        <Card>
          <ClickActionButton action={ click }/>
          {
            Object.keys(data).map(function(key, idx){
              return <div key={ idx }><strong>{ key }: </strong>{ data[key] }</div>
            })
          }
        </Card>
      </div>
    )
  }
}

MemberDescPanel.propTypes = {
  desc_load: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { desc_load } = state.p_members
  return { desc_load }
}

export default connect(mapStateToProps)(MemberDescPanel)