// @flow
export const AUTH = 'AUTH'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'

export function auth(payload) {
  return {
    type: AUTH,
    payload
  }
}

export function login(payload) {
  return {
    type: LOGIN,
    payload
  }
}

export function logout(payload) {
  return {
    type: LOGOUT,
    payload
  }
}

export function requestLogin(payload) {
  return {
    type: REQUEST_LOGIN,
    payload
  }
}

export function receiveLogin(payload, msg) {
  return {
    type: RECEIVE_LOGIN,
    payload,
    msg,
    receivedAt: Date.now()
  }
}

export function requestLogout() {
  return {
    type: REQUEST_LOGOUT
  }
}

export function receiveLogout(payload) {
  return {
    type: RECEIVE_LOGOUT,
    payload,
    receivedAt: Date.now()
  }
}