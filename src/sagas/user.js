// @flow
import { takeEvery, delay } from "redux-saga";
import { put, call, fork } from "redux-saga/effects";
import * as U from "../actions/user";
import { getAll, get, create } from 'firebase-saga';

export function fetchUser(user) {
  const { name, pass } = user.payload
  if (name && pass){
    return {
      name : name,
      pass : pass
    }
  }
  return { name : "", pass : "" }
}

export function removeUser() {
  return {
    name : '',
    pass : ''
  }
}

export function* loginH(user) {
  yield put( U.requestLogin(user) )
  const msg = yield call(fetchUser, user)
  try {
    console.log("Logging in")
    const posts = yield call(get, 'profiles', msg.name)
    console.log(posts.password)
    console.log(msg.pass)
    if (posts.password === msg.pass) {
      console.log("Right Pass")
      yield put( U.receiveLogin(user, posts))
    } else {
      console.log("Wrong Pass")
    }
  }
  catch (error) {
    console.log("Error. Logging Out")
    yield put( U.receiveLogout(error) )
  }
}

export function* login(user) {
  yield takeEvery(U.LOGIN, loginH)
}

export function* logoutH() {
  yield put( U.requestLogout() )
  const msg = yield call(removeUser)
  yield put( U.receiveLogout(msg) )
}

export function* logout() {
  yield takeEvery(U.LOGOUT, logoutH)
}