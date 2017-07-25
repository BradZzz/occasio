// @flow
import { handleActions } from "redux-actions";
import * as N from "../actions/nav"
import { BLANK_USR, LOGO_COLOR } from '../constants/application'
import React from "react"

import ActionHome from 'material-ui/svg-icons/action/home'
import SocialPoll from 'material-ui/svg-icons/social/poll'
import ActionWork from 'material-ui/svg-icons/action/work'
import SocialPeople from 'material-ui/svg-icons/social/people'
import SocialLocationCity from 'material-ui/svg-icons/social/location-city'
import ContentArchive from 'material-ui/svg-icons/content/archive'
import { white } from 'material-ui/styles/colors';

import { DashboardPartial, HomePartial, MemberPartial, ProviderPartial, CampaignPartial } from '../containers/pages/partials'

const initialState = {
  meta: BLANK_USR,
  pos: 0,
  expFlag: false,
  tabs: [
    { icon: <ActionHome/>, text: 'Home', nav: '/home', content: (<HomePartial/>),
      sub: [<div>Updates</div>,<div>Feed</div>,<div>Blog</div>], partial: 'p_home'
    },
    { icon: <SocialPoll/>, text: 'Dashboard', nav: '/dash', content: (<DashboardPartial/>),
      sub: [<div>Updates</div>,<div>Feed</div>,<div>Blog</div>], partial: 'p_dash'
    },
    { icon: <ActionWork/>, text: 'Campaigns', nav: '/camp', content: (<CampaignPartial/>),
      sub: [<div>Updates</div>,<div>Feed</div>,<div>Blog</div>], partial: 'p_campaigns'
    },
    { icon: <SocialPeople/>, text: 'Member Index', nav: '/membi', content: (<MemberPartial/>),
      sub: [<div>Updates</div>,<div>Feed</div>,<div>Blog</div>], partial: 'p_members'
    },
    { icon: <SocialLocationCity/>, text: 'Provider Index', nav: '/provi', content: (<ProviderPartial/>),
      sub: [<div>Updates</div>,<div>Feed</div>,<div>Blog</div>], partial: 'p_providers'
    },
    { icon: <ContentArchive/>, text: 'Downloads', nav: '/downlds', content: (<div>Downloads</div>),
      sub: [<div>Updates</div>,<div>Feed</div>,<div>Blog</div>], partial: 'p_home'
    }
  ],
}

export default handleActions({
  [N.NAV_REQ]: (state = { }, action) => ({
    ...state,
    pos: action.payload.pos
  }),
  [N.EXP_REQ]: (state = { }, action) => ({
    ...state,
    expFlag: action.payload.expFlag
  })
}, initialState);