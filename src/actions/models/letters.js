// @flow
export const QUERY_LETTER_MODEL = 'QUERY_LETTER_MODEL'
export const REQUEST_LETTER_MODEL = 'REQUEST_LETTER_MODEL'
export const RECEIVE_LETTER_MODEL = 'RECEIVE_LETTER_MODEL'

export function queryLetter(payload) {
  return {
    type: QUERY_LETTER_MODEL,
    payload
  }
}

export function letterReq(payload) {
  return {
    type: REQUEST_LETTER_MODEL,
    payload
  }
}

export function letterRec(payload) {
  return {
    type: RECEIVE_LETTER_MODEL,
    payload
  }
}