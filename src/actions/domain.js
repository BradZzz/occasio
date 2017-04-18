// @flow
//The call to pull in the domain list
export const QUERY_DOMAINS = 'QUERY_DOMAINS'

//Intermediaries for the request
export const REQUEST_DOMAINS = 'REQUEST_DOMAINS'
export const RECEIVE_DOMAINS = 'RECEIVE_DOMAINS'

//Sorting the domain list
export const SORT_DOMAIN_NAME = 'SORT_DOMAIN_NAME'
export const SORT_DOMAIN_EXP = 'SORT_DOMAIN_EXP'

//Navigating to info page
export const NAV_DOMAIN_SPECIFIC = 'NAV_DOMAIN_SPECIFIC'
export const NAV_DOMAIN_GENERAL = 'NAV_DOMAIN_GENERAL'

export function queryDomains(payload) {
  return {
    type: QUERY_DOMAINS,
    payload,
  }
}

export function requestDomains(payload) {
  return {
    type: REQUEST_DOMAINS,
    payload,
  }
}

export function receiveDomains(payload) {
  return {
    type: RECEIVE_DOMAINS,
    payload,
    receivedAt: Date.now()
  }
}

export function sortDomName(payload) {
  return {
    type: SORT_DOMAIN_NAME,
    payload
  }
}

export function sortDomExp(payload) {
  return {
    type: SORT_DOMAIN_EXP,
    payload
  }
}

export function navDomSpec(payload) {
  return {
    type: NAV_DOMAIN_SPECIFIC,
    payload
  }
}

export function navDomGen() {
  return {
    type: NAV_DOMAIN_GENERAL
  }
}