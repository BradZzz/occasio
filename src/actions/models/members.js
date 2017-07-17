// @flow
export const QUERY_MEMBERS_MODEL = 'QUERY_MEMBERS_MODEL'
export const REQUEST_MEMBERS_MODEL = 'REQUEST_MEMBERS_MODEL'
export const RECEIVE_MEMBERS_MODEL = 'RECEIVE_MEMBERS_MODEL'

export function queryMembers(payload) {
  return {
    type: QUERY_MEMBERS_MODEL,
    payload
  }
}

export function memberReq(payload) {
  return {
    type: REQUEST_MEMBERS_MODEL,
    payload
  }
}

export function memberRec(payload) {
  return {
    type: RECEIVE_MEMBERS_MODEL,
    payload
  }
}