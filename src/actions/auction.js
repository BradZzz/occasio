// @flow
//The call to pull in the auction list
export const QUERY_AUCTIONS = 'QUERY_AUCTIONS'

//Intermediaries for the request
export const REQUEST_AUCTIONS = 'REQUEST_AUCTIONS'
export const RECEIVE_AUCTIONS = 'RECEIVE_AUCTIONS'

//Sorting the auction list
export const SORT_AUCTIONS_NAME = 'SORT_AUCTIONS_NAME'
export const SORT_AUCTIONS_EXP = 'SORT_AUCTIONS_EXP'
export const SORT_AUCTIONS_BID = 'SORT_AUCTIONS_BID'

//Navigating to info page
export const NAV_AUCTIONS_SPECIFIC = 'NAV_AUCTIONS_SPECIFIC'
export const NAV_AUCTIONS_GENERAL = 'NAV_AUCTIONS_GENERAL'

export function queryAuctions(payload) {
  return {
    type: QUERY_AUCTIONS,
    payload,
  }
}

export function requestAuctions(payload) {
  return {
    type: REQUEST_AUCTIONS,
    payload,
  }
}

export function receiveAuctions(payload) {
  return {
    type: RECEIVE_AUCTIONS,
    payload,
    receivedAt: Date.now()
  }
}

export function sortAuctName(payload) {
  return {
    type: SORT_AUCTIONS_NAME,
    payload
  }
}

export function sortAuctExp(payload) {
  return {
    type: SORT_AUCTIONS_EXP,
    payload
  }
}

export function sortAuctBid(payload) {
  return {
    type: SORT_AUCTIONS_BID,
    payload
  }
}

export function navAuctSpec(payload) {
  return {
    type: NAV_AUCTIONS_SPECIFIC,
    payload
  }
}

export function navAuctGen() {
  return {
    type: NAV_AUCTIONS_GENERAL
  }
}