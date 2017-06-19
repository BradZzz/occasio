// @flow
export const NAV_REQ = 'NAV_REQUESTED'
export const NAV_IMP = 'NAV_IMPLEMENTED'

export function navReq(payload) {
  return {
    type: NAV_REQ,
    payload
  }
}

//export function navImp(payload) {
//  return {
//    type: NAV_IMP,
//    payload
//  }
//}