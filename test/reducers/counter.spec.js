/* eslint-disable no-undefined */
import assert from "power-assert";
import counter from "../../src/reducers/counter";
import * as C from "../../src/actions/counter";


describe("reducer: (counter)", () => {
  it("Should return the initial state", () => {
    assert(
      counter(undefined, {}),
      { count: 0 }
    );
  });

  it("Should be handle INCREMENT", () => {
    assert.deepStrictEqual(
      counter({ count: 0 }, C.increment()),
      { count: 1 }
    );
  });

  it("Should be handle DECREMENT", () => {
    assert.deepStrictEqual(
      counter({ count: 1 }, C.decrement()),
      { count: 0 }
    );
  });
});
