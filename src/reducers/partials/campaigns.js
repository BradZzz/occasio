// @flow
import { handleActions } from "redux-actions";
import React from "react"

import ContentClear from "material-ui/svg-icons/content/clear"
import ActionFace from "material-ui/svg-icons/action/face"
import MapsLocalPharmacy from "material-ui/svg-icons/maps/local-pharmacy"
import AvWeb from "material-ui/svg-icons/av/web"
import CommunicationMailOutline from "material-ui/svg-icons/communication/mail-outline"
import ContentCreate from "material-ui/svg-icons/content/create"

import * as C from "../../actions/partials/campaigns"
import { ClickActionButton } from "../../components/atoms"
import { SECTION_COLORS } from "../../constants/application"
import { StackedBarPanel } from "../../components/molecules"
import styles from "./styles.css"

const generateTabDOM = (tab, idx) => (
  <ClickActionButton key={ idx } action={ () => console.log("click") } className={ styles.detail }
    style={{ "width" : parseInt(90 / initialState.desc_tabs.length) + "%", "background" : SECTION_COLORS[idx * 2] }}
    tooltip={ tab.name } > { tab.nav } </ClickActionButton>)

const initialState = {
  desc: false,
  desc_load: {},
  desc_tabs: [
    { name: "Highlights", nav: <ActionFace/>,
      content: (camp) => {
        return (
          <div>
            <StackedBarPanel title="Stacked Bar Chart" sub="Bars on Bars" data={ {} } width={ 600 } height={ 300 } />
          </div>
        )
      }
    },
    { name: "HCC Registry", nav: <MapsLocalPharmacy/>,
      content: (camp) => {
        return (
          <div>
            <StackedBarPanel title="Stacked Bar Chart" sub="Bars on Bars" data={ {} } width={ 600 } height={ 300 } />
          </div>
        )
      }
    },
    { name: "Medical Records", nav: <AvWeb/>,
      content: (camp) => {
        return (
          <div>
            <StackedBarPanel title="Stacked Bar Chart" sub="Bars on Bars" data={ {} } width={ 600 } height={ 300 } />
          </div>
        )
      }
    },
    { name: "Letters", nav: <CommunicationMailOutline/>,
      content: (camp) => {
        return (
          <div>
            <StackedBarPanel title="Stacked Bar Chart" sub="Bars on Bars" data={ {} } width={ 600 } height={ 300 } />
          </div>
        )
      }
    },
    { name: "Notes", nav: <ContentCreate/>,
      content: (camp) => {
        return (
          <div>
            <StackedBarPanel title="Stacked Bar Chart" sub="Bars on Bars" data={ {} } width={ 600 } height={ 300 } />
          </div>
        )
      }
    },
  ],
  retCont: () => initialState.desc_tabs.map( (tab) => tab.content ),
  retNav: () => initialState.desc_tabs.map( (tab) => { return { name: tab.name, nav: tab.nav }}),

//  retNav: () => (
//    <span>
//      { initialState.desc_tabs.map((tab,idx) => generateTabDOM(tab,idx)) }
//    </span>
//  )
}

export default handleActions({
  [C.LOAD_CAMPAIGN_DESC]: (state = { }, action) => ({
    ...state,
    desc: true,
    desc_load: action.payload
  }),
  [C.UNLOAD_CAMPAIGN_DESC]: (state = { }) => ({
    ...state,
    desc: false,
    desc_load: {}
  }),
}, initialState);