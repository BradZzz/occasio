// @flow
export const QUERY_DX_MODEL = 'QUERY_DX_MODEL'
export const REQUEST_DX_MODEL = 'REQUEST_DX_MODEL'
export const RECEIVE_DX_MODEL = 'RECEIVE_DX_MODEL'

export function queryDx(payload) {
  return {
    type: QUERY_DX_MODEL,
    payload
  }
}

export function dxReq(payload) {
  return {
    type: REQUEST_DX_MODEL,
    payload
  }
}

export function dxRec(payload) {
  return {
    type: RECEIVE_DX_MODEL,
    payload
  }
}