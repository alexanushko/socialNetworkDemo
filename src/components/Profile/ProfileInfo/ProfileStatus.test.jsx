import React from "react";
import { create } from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";
import {getBatch} from "react-redux/lib/utils/batch";
import {loginMeThunkCreator} from "../../../redux/authReducer";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="hey" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("hey");
  });
  test("after creation span should be displayed", () => {
    const component = create(<ProfileStatus status="hey" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("after creation span should be displayed with correct status", () => {
    const component = create(<ProfileStatus status="hey" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.innerText).toBe('hey');
  });
});
