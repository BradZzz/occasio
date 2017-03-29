/* eslint-disable no-undefined */
import assert from "power-assert";
import { delay } from "redux-saga";
import { call, put } from "redux-saga/effects";
import * as C from "../../src/actions/counter";
import { incrementAsync } from "../../src/sagas/counter";


describe("saga: (counter)", () => {
  it("incrementAsync()", () => {
    const saga = incrementAsync();

    assert.deepStrictEqual(
      saga.next().value,
      call(delay, 1000)
    );

    assert.deepStrictEqual(
      saga.next().value,
      put(C.increment())
    );

    assert.deepStrictEqual(
      saga.next(),
      { done: true, value: undefined }
    );
  });
});
