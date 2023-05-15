import React from "react";
import { render, screen } from "@testing-library/react";
import ModalTemplate from "./ModalTemplate";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn();
describe("It tests the ModalTemplate component", () => {
  it("Tests if the component mounts", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <ModalTemplate
          isOpen
          onClose={testFunc}
          headerTitle="Test Title"
        >
          <p>Sample text</p>
        </ModalTemplate>
      </Provider>
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Sample text')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
