// @flow
export const QUERY_PROVIDERS_MODEL = 'QUERY_PROVIDERS_MODEL'
export const REQUEST_PROVIDERS_MODEL = 'REQUEST_PROVIDERS_MODEL'
export const RECEIVE_PROVIDERS_MODEL = 'RECEIVE_PROVIDERS_MODEL'

export function queryProviders(payload) {
  return {
    type: QUERY_PROVIDERS_MODEL,
    payload
  }
}

export function providersReq(payload) {
  return {
    type: REQUEST_PROVIDERS_MODEL,
    payload
  }
}

export function providersRec(payload) {
  return {
    type: RECEIVE_PROVIDERS_MODEL,
    payload
  }
}