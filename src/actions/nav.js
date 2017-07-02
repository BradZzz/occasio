// @flow
export const NAV_REQ = 'NAV_REQUESTED'

export function navReq(payload) {
  return {
    type: NAV_REQ,
    payload
  }
}