// @flow
import { handleActions } from "redux-actions";
import * as N from "../actions/nav"
import { BLANK_USR } from '../constants/application'
import React from "react"

import ActionHome from 'material-ui/svg-icons/action/home'
import SocialPoll from 'material-ui/svg-icons/social/poll'
import ActionWork from 'material-ui/svg-icons/action/work'
import SocialPeople from 'material-ui/svg-icons/social/people'
import SocialLocationCity from 'material-ui/svg-icons/social/location-city'
import ContentArchive from 'material-ui/svg-icons/content/archive'
import { white } from 'material-ui/styles/colors';

import { HomePartial, MemberPartial } from '../containers/pages/partials'

const initialState = {
  meta: BLANK_USR,
  isFetching: false,
  pos: 0,
  tabs: [
    { icon: (<ActionHome color={white} />), text: 'Home', nav: '/home', content: (<HomePartial/>) },
    { icon: (<SocialPoll color={white} />), text: 'Dashboard', nav: '/dash', content: (<div>Dashboard</div>) },
    { icon: (<ActionWork color={white} />), text: 'Campaigns', nav: '/camp', content: (<div>Campaigns</div>) },
    { icon: (<SocialPeople color={white} />), text: 'Member Index', nav: '/membi', content: (<MemberPartial/>) },
    { icon: (<SocialLocationCity color={white} />), text: 'Provider Index', nav: '/provi', content: (<div>Provider Index</div>) },
    { icon: (<ContentArchive color={white} />), text: 'Downloads', nav: '/downlds', content: (<div>Downloads</div>) }
  ],
}

export default handleActions({
  [N.NAV_REQ]: (state = { }, action) => ({
    ...state,
    isFetching: true,
    pos: action.payload.pos
  }),
  [N.NAV_IMP]: (state = { }, action) => ({
    ...state,
    isFetching: false,
  }),
}, initialState);