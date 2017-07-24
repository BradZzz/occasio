// @flow
export const QUERY_CAMPAIGNS_MODEL = 'QUERY_CAMPAIGNS_MODEL'
export const REQUEST_CAMPAIGNS_MODEL = 'REQUEST_CAMPAIGNS_MODEL'
export const RECEIVE_CAMPAIGNS_MODEL = 'RECEIVE_CAMPAIGNS_MODEL'

export function queryCampaigns(payload) {
  return {
    type: QUERY_CAMPAIGNS_MODEL,
    payload
  }
}

export function campaignsReq(payload) {
  return {
    type: REQUEST_CAMPAIGNS_MODEL,
    payload
  }
}

export function campaignsRec(payload) {
  return {
    type: RECEIVE_CAMPAIGNS_MODEL,
    payload
  }
}