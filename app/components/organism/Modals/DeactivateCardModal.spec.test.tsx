import React from "react";
import { fireEvent, getAllByTestId, render, screen } from "@testing-library/react";
import DeactivateCardModal from "./DeactivateCardModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn();
describe("Tests the DeactivateCardModal component", () => {
  it("Tests if the component mounts", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <DeactivateCardModal
          isOpen
          onClose={testFunc}
          userCards={null}
          inactiveCards={null}
        />
      </Provider>
    );
    expect(baseElement).toBeTruthy();
    expect(
      screen.getByText("Select a new primary account:")
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(2);
  });

  it("Tests the deactivate functionality", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <DeactivateCardModal
          isOpen
          onClose={testFunc}
          userCards={null}
          inactiveCards={null}
        />
      </Provider>
    );
    const select = screen.getByRole("combobox");
    const button = screen.getAllByRole("button")[1];

    fireEvent.change(select, { target: { value: 1 } });
    fireEvent.click(button);
    expect(testFunc).not.toBeCalled();
  });
});
