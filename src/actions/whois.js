// @flow
//The call to pull in the auction list
export const QUERY_WHOIS = 'QUERY_WHOIS'

//Intermediaries for the request
export const REQUEST_WHOIS = 'REQUEST_WHOIS'
export const RECEIVE_WHOIS = 'RECEIVE_WHOIS'

export function queryWhois(payload) {
  return {
    type: QUERY_WHOIS,
    payload,
  }
}

export function requestWhois(payload) {
  return {
    type: REQUEST_WHOIS,
  }
}

export function receiveWhois(payload) {
  return {
    type: RECEIVE_WHOIS,
    payload,
    receivedAt: Date.now()
  }
}