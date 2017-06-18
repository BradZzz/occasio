import assert from "power-assert";
import sinon from "sinon";
import React from "react";
import { mount } from "enzyme";
import Button from "./Button";


describe("<Button />", () => {
  it("Should be call onClick", () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Button onClick={onClick} />);
    assert(onClick.callCount === 0);
    wrapper.simulate("click");
    assert(onClick.callCount === 1);
  });
});
