// @flow
export const LOAD_MEMBER_DESC = 'LOAD_MEMBER_DESC'
export const UNLOAD_MEMBER_DESC = 'UNLOAD_MEMBER_DESC'

export function loadMemberDesc(payload) {
  return {
    type: LOAD_MEMBER_DESC,
    payload
  }
}

export function unloadMemberDesc(payload) {
  return {
    type: UNLOAD_MEMBER_DESC,
    payload
  }
}