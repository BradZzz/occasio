// @flow
import { handleActions } from "redux-actions";
import React from "react"

import ContentClear from "material-ui/svg-icons/content/clear"
import ActionFace from "material-ui/svg-icons/action/face"
import MapsLocalPharmacy from "material-ui/svg-icons/maps/local-pharmacy"
import AvWeb from "material-ui/svg-icons/av/web"
import CommunicationMailOutline from "material-ui/svg-icons/communication/mail-outline"
import ContentCreate from "material-ui/svg-icons/content/create"

import * as M from "../../actions/partials/members"
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
    { name: "Highlights", nav: <ActionFace/>, content: <div><StackedBarPanel title="Stacked Bar Chart" sub="Bars on Bars" data={ {} } width={ 600 } height={ 300 } /></div> },
    { name: "HCC Registry", nav: <MapsLocalPharmacy/>, content: <div>1</div> },
    { name: "Medical Records", nav: <AvWeb/>, content: <div>2</div> },
    { name: "Letters", nav: <CommunicationMailOutline/>, content: <div>3</div> },
    { name: "Notes", nav: <ContentCreate/>, content: <div>4</div> },
  ],
  retCont: () => initialState.desc_tabs.map( (tab) => tab.content ),
  retNav: () => initialState.desc_tabs.map( (tab) => { return { name: tab.name, nav: tab.nav }}),
}

export default handleActions({
  [M.LOAD_MEMBER_DESC]: (state = { }, action) => ({
    ...state,
    desc: true,
    desc_load: action.payload
  }),
  [M.UNLOAD_MEMBER_DESC]: (state = { }) => ({
    ...state,
    desc: false,
    desc_load: {}
  }),
}, initialState);