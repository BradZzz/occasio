// @flow
export const DASHBOARD_REQUESTED = 'DASHBOARD_REQUESTED'

export function dashReq(payload) {
  return {
    type: DASHBOARD_REQUESTED,
    payload
  }
}