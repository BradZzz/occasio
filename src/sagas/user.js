// @flow
import { takeEvery, delay } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import * as U from "../actions/user";
import { getAll, get, create } from 'firebase-saga';
import { BLANK_USR } from '../constants/application'

export function fetchUser(user) {
  const { name, email, emailV, photoURL, uid, accessToken, providerData } = user.payload
  console.log(user.payload)
  console.log(providerData)
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

//export function* loginH(user) {
//  yield put( U.requestLogin(user) )
//  const msg = yield call(fetchUser, user)
//  try {
//    console.log("Logging in")
//    const posts = yield call(get, 'profiles', msg.name)
//    console.log(posts.password)
//    console.log(msg.pass)
//    if (posts.password === msg.pass) {
//      console.log("Right Pass")
//      yield put( U.receiveLogin(user, posts))
//    } else {
//      console.log("Wrong Pass")
//    }
//  }
//  catch (error) {
//    console.log("Error logging in")
//    console.log(error)
//    yield put( U.receiveLogout({ msg : "Error logging in" }) )
//  }
//}

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

//export function initFirebase() {
//  return firebase.initializeApp({
//    apiKey: "AIzaSyDs_UalXlf6uzpPcPX0IBVF0SD61fgb1U8",
//    authDomain: "xdomio-1fdcc.firebaseapp.com",
//    databaseURL: "https://xdomio-1fdcc.firebaseio.com",
//    storageBucket: "xdomio-1fdcc.appspot.com",
//    messagingSenderId: "1002071359895"
//  })
//}
//
////export function* initAll() {
////  yield call(initFirebase)
////}
//
//export default function* root() {
//  yield call(initFirebase)
//}
