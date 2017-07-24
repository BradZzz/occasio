// @flow
export const LOAD_CAMPAIGN_DESC = 'LOAD_CAMPAIGN_DESC'
export const UNLOAD_CAMPAIGN_DESC = 'UNLOAD_CAMPAIGN_DESC'

export function loadCampaignDesc(payload) {
  return {
    type: LOAD_CAMPAIGN_DESC,
    payload
  }
}

export function unloadCampaignDesc(payload) {
  return {
    type: UNLOAD_CAMPAIGN_DESC,
    payload
  }
}