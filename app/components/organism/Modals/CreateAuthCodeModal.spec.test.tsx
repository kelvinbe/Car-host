import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CreateAuthCodeModal from "./CreateAuthCodeModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../../utils/theme";

const testFunc = jest.fn();
const testFunc1 = jest.fn();
describe("Tests the create auth code model component", () => {
  it("Tests if the component mounts", () => {
    const { baseElement } = render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <CreateAuthCodeModal
            isOpen
            onClose={testFunc}
            authcodeId={2}
            userId={1}
            showRequestsTable={testFunc1}
          />
        </Provider>
      </ChakraProvider>
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("Get AuthCode")).toBeInTheDocument();
  });

  it("Tests generate authcode button", () => {
    render(
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <CreateAuthCodeModal
            isOpen
            onClose={testFunc}
            authcodeId={2}
            userId={1}
            showRequestsTable={testFunc1}
          />
        </Provider>
      </ChakraProvider>
    );
    const button = screen.getByTestId("authcode");
    fireEvent.click(button);
    expect(testFunc).toBeCalled();
    expect(testFunc1).toBeCalled();
  });
});
