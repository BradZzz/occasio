export const QUERY_BIDS = 'QUERY_BIDS'
export const REQUEST_BIDS = 'REQUEST_BIDS'
export const RECEIVE_BIDS = 'RECEIVE_BIDS'
/*<=================================================>*/
export const QUERY_CREATEBIDS = 'QUERY_CREATEBIDS'
export const REQUEST_CREATEBIDS = 'REQUEST_CREATEBIDS'
export const RECEIVE_CREATEBIDS = 'RECEIVE_CREATEBIDS'

export function queryBids(payload) {
  return {
    type: QUERY_BIDS,
    payload,
  }
}

export function requestBids(payload) {
  return {
    type: REQUEST_BIDS,
    payload,
  }
}

export function receiveBids(payload) {
  return {
    type: RECEIVE_BIDS,
    payload,
    receivedAt: Date.now()
  }
}

export function queryCreateBids(payload) {
  return {
    type: QUERY_CREATEBIDS,
    payload,
  }
}

export function requestCreateBids(payload) {
  return {
    type: REQUEST_CREATEBIDS,
    payload,
  }
}

export function receiveCreateBids(payload) {
  return {
    type: RECEIVE_CREATEBIDS,
    payload,
    receivedAt: Date.now()
  }
}