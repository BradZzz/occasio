// @flow
export const QUERY_HCC_MODEL = 'QUERY_HCC_MODEL'
export const REQUEST_HCC_MODEL = 'REQUEST_HCC_MODEL'
export const RECEIVE_HCC_MODEL = 'RECEIVE_HCC_MODEL'

export function queryHcc(payload) {
  return {
    type: QUERY_HCC_MODEL,
    payload
  }
}

export function hccReq(payload) {
  return {
    type: REQUEST_HCC_MODEL,
    payload
  }
}

export function hccRec(payload) {
  return {
    type: RECEIVE_HCC_MODEL,
    payload
  }
}