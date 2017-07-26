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
import { StackedBarPanel, InfoPanel, HCCPanel, MedicalPanel } from "../../components/molecules"
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
      content: (user) => {
        console.log(user)
        const rendered = [
          { name: 'Eligible', name_sub: 'in 2017', num: user.current_is_eligible ? "True" : "False", num_sub: '' },
          { name: 'Eligible', name_sub: 'in 2016', num: user.prior_is_eligible ? "True" : "False", num_sub: '' },
          { name: 'Eligible', name_sub: 'in 2015', num: user.prior2_is_eligible ? "True" : "False", num_sub: '' },
          { name: 'Recapture Opps', name_sub: 'in 2017', num: user.num_current_hcc_suspects_yoy, num_sub: '' },
          { name: 'Recapture Opps Value', name_sub: 'in 2017', num: user.current_raf_suspects_yoy, num_sub: '' },
          { name: 'DOS Visits', name_sub: 'in 2017', num: user.current_dos_count, num_sub: '' },
          { name: 'DOS Visits', name_sub: 'in 2016', num: user.prior_dos_count, num_sub: '' },
          { name: 'Last Encounter', name_sub: 'in 2017', num: user.last_encounter, num_sub: '' },
        ]

        const config = {
          series: [{
              name: 'RAF',
              data: [user.current_raf_captured, 0, user.prior_raf_captured, 0]
          }, {
              name: 'Demographics',
              data: [0, user.current_raf_demo, 0, user.prior_raf_demo]
          }, {
              name: 'Captured HCC',
              data: [0, user.current_hcc_captured, 0, user.prior_hcc_captured]
          }, {
              name: 'Opportunity',
              data: [0, user.current_opportunity, 0, user.prior_opportunity]
          }],
          xAxis: {
              categories: ['RAF 2017', 'Projected RAF 2017', 'RAF 2016', 'Projected RAF 2016']
          },
          yAxis: {
              min: 0,
              title: {
                  text: null
              }
          }
        }
        return (
          <div>
            <InfoPanel width={ 500 } title="Summary" sub="" data={ rendered }/>
            <StackedBarPanel title="RAF" sub="" data={ config } width={ 600 } height={ 300 } />
          </div>
        )
      }
    },
    { name: "HCC Registry", nav: <MapsLocalPharmacy/>,
      content: (user) => {
        return (
          <div>
            <HCCPanel member={ parseInt(user.dbid) }/>
          </div>
        )
      }
    },
    { name: "Medical Records", nav: <AvWeb/>,
      content: (user) => {
        return (
          <div>
            <MedicalPanel member={ parseInt(user.dbid) }/>
          </div>
        )
      }
    },
    { name: "Letters", nav: <CommunicationMailOutline/>,
      content: (user) => {
        return (
          <div>
            <StackedBarPanel title="Stacked Bar Chart" sub="Bars on Bars" data={ {} } width={ 600 } height={ 300 } />
          </div>
        )
      }
    },
    { name: "Notes", nav: <ContentCreate/>,
      content: (user) => {
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