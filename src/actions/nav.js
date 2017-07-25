// @flow
export const NAV_REQ = 'NAV_REQUESTED'
export const EXP_REQ = 'EXP_REQ'

export function navReq(payload) {
  return {
    type: NAV_REQ,
    payload
  }
}

export function expReq(payload) {
  return {
    type: EXP_REQ,
    payload
  }
}