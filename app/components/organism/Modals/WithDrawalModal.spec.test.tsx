import React from "react";
import { render, screen } from "@testing-library/react";
import WithDrawalModal from "./WithDrawalModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";

describe("It tests the WithDrawalModal component", () => {
  const testFunc = jest.fn()
    it("Tests if the component mounts", () => {
      const { baseElement } = render(
        <Provider store={store}>
          <WithDrawalModal
            isOpen
            onClose={testFunc}
          />

        </Provider>
      );
      expect(baseElement).toBeTruthy();
    });
})