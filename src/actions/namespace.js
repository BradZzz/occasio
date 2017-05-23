export const QUERY_BACKORDERS = 'QUERY_BACKORDERS'
export const REQUEST_BACKORDERS = 'REQUEST_BACKORDERS'
export const RECEIVE_BACKORDERS = 'RECEIVE_BACKORDERS'
/*<=================================================>*/
export const QUERY_ORDERS = 'QUERY_ORDERS'
export const REQUEST_ORDERS = 'REQUEST_ORDERS'
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS'

export function queryBackorder(payload) {
  return {
    type: QUERY_BACKORDERS,
    payload,
  }
}

export function requestBackorder(payload) {
  return {
    type: REQUEST_BACKORDERS,
    payload,
  }
}

export function receiveBackorder(payload) {
  return {
    type: RECEIVE_BACKORDERS,
    payload,
    receivedAt: Date.now()
  }
}

export function queryOrders(payload) {
  return {
    type: QUERY_ORDERS,
    payload,
  }
}

export function requestOrders(payload) {
  return {
    type: REQUEST_ORDERS,
    payload,
  }
}

export function receiveOrders(payload) {
  return {
    type: RECEIVE_ORDERS,
    payload,
    receivedAt: Date.now()
  }
}