// @flow
import { takeEvery, delay } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import * as U from "../actions/user";
import { getAll, get, create } from 'firebase-saga';
import { BLANK_USR } from '../constants/application'

export function fetchUser(user) {
  const { name, email, emailV, photoURL, uid, accessToken, providerData } = user.payload
  return {
    name: name,
    email: email,
    emailV: emailV.toString(),
    photoURL: photoURL,
    uid: uid,
    accessToken: accessToken,
    providerData: providerData[0].providerId || ""
  }
}

export function removeUser() {
  return BLANK_USR
}

export function* loginH(user) {
  yield put( U.requestLogin(user) )
  const msg = yield call(fetchUser, user)
  yield put( U.receiveLogin(user, msg))
}

export function* login(user) {
  yield takeEvery(U.LOGIN, loginH)
}

export function* logoutH() {
  yield put( U.requestLogout() )
  const msg = yield call(removeUser)
  yield put( U.receiveLogout({ msg : "" }) )
}

export function* logout() {
  yield takeEvery(U.LOGOUT, logoutH)
}