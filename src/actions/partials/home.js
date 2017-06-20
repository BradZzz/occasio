// @flow
export const FEED_QUE = 'HOME_FEED_QUERY'
export const FEED_REQ = 'HOME_FEED_REQUESTED'
export const FEED_REC = 'HOME_FEED_RECEIVED'

export function queryFeed(payload) {
  return {
    type: FEED_QUE,
    payload
  }
}

export function feedReq(payload) {
  return {
    type: FEED_REQ,
    payload
  }
}

export function feedRec(payload) {
  return {
    type: FEED_REC,
    payload
  }
}