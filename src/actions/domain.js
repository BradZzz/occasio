// @flow
//The call to pull in the domain list
export const QUERY_DOMAINS = 'QUERY_DOMAINS'
export const QUERY_APPRAISALS = 'QUERY_APPRAISALS'

//Intermediaries for the request
export const REQUEST_DOMAINS = 'REQUEST_DOMAINS'
export const RECEIVE_DOMAINS = 'RECEIVE_DOMAINS'

export const REQUEST_APPRAISALS = 'REQUEST_APPRAISALS'
export const RECEIVE_APPRAISALS = 'RECEIVE_APPRAISALS'

//Sorting the domain list
export const SORT_DOMAIN_NAME = 'SORT_DOMAIN_NAME'
export const SORT_DOMAIN_APP = 'SORT_DOMAIN_APP'
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

export function queryAppraisals(payload) {
  return {
    type: QUERY_APPRAISALS,
    payload,
  }
}

export function requestAppraisals(payload) {
  return {
    type: REQUEST_APPRAISALS,
    payload,
  }
}

export function receiveAppraisals(payload) {
  return {
    type: RECEIVE_APPRAISALS,
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

export function sortDomApp(payload) {
  return {
    type: SORT_DOMAIN_APP,
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