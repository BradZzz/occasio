// @flow
export const SWAP_BOOKS = 'SWAP_BOOKS'
export const NAV_BOOKS = 'NAV_BOOKS'
export const NAV_BOOKS_COMP = 'NAV_BOOKS_COMP'

export const QUERY_LIST_BOOKS = 'QUERY_LIST_BOOKS'
export const REQ_LIST_BOOKS = 'REQ_LIST_BOOKS'
export const REC_LIST_BOOKS = 'REC_LIST_BOOKS'

export const QUERY_SUMMARY_BOOKS = 'QUERY_SUMMARY_BOOKS'
export const REQ_SUMMARY_BOOKS = 'REQ_SUMMARY_BOOKS'
export const REC_SUMMARY_BOOKS = 'REC_SUMMARY_BOOKS'

export const QUERY_SEARCH_BOOKS = 'QUERY_SEARCH_BOOKS'
export const QUERY_SEARCH_BOOKS_COMP = 'QUERY_SEARCH_BOOKS_COMP'
export const REQ_SEARCH_BOOKS = 'REQ_SEARCH_BOOKS'
export const REQ_SEARCH_BOOKS_COMP = 'REQ_SEARCH_BOOKS_COMP'
export const REC_SEARCH_BOOKS = 'REC_SEARCH_BOOKS'
export const REC_SEARCH_BOOKS_COMP = 'REC_SEARCH_BOOKS_COMP'

export function swapBooks(payload) {
  return {
    type: SWAP_BOOKS,
    payload
  }
}

export function navBooks(payload) {
  return {
    type: NAV_BOOKS,
    payload
  }
}

export function navBooksComp(payload) {
  return {
    type: NAV_BOOKS_COMP,
    payload
  }
}

export function queryListBooks(payload) {
  return {
    type: QUERY_LIST_BOOKS,
    payload
  }
}

export function reqListBooks(payload) {
  return {
    type: REQ_LIST_BOOKS,
    payload
  }
}

export function recListBooks(payload) {
  return {
    type: REC_LIST_BOOKS,
    payload
  }
}

export function querySummaryBooks(payload) {
  return {
    type: QUERY_SUMMARY_BOOKS,
    payload
  }
}

export function reqSummaryBooks(payload) {
  return {
    type: REQ_SUMMARY_BOOKS,
    payload
  }
}

export function recSummaryBooks(payload) {
  return {
    type: REC_SUMMARY_BOOKS,
    payload
  }
}

export function querySearchBooks(payload) {
  return {
    type: QUERY_SEARCH_BOOKS,
    payload
  }
}

export function querySearchBooksComp(payload) {
  return {
    type: QUERY_SEARCH_BOOKS_COMP,
    payload
  }
}

export function reqSearchBooks(payload) {
  return {
    type: REQ_SEARCH_BOOKS,
    payload
  }
}

export function reqSearchBooksComp(payload) {
  return {
    type: REQ_SEARCH_BOOKS_COMP,
    payload
  }
}

export function recSearchBooks(payload) {
  return {
    type: REC_SEARCH_BOOKS,
    payload
  }
}

export function recSearchBooksComp(payload) {
  return {
    type: REC_SEARCH_BOOKS_COMP,
    payload
  }
}