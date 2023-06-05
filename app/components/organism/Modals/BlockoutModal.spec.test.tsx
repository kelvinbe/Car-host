import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BlockoutModal from "./BlockoutModal";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import dayjs from "dayjs";
import useReservation from "../../../hooks/useReservation";
import { IReservation } from "../../../globaltypes";

const mockAddReservation = jest.fn();

jest.mock("../../../hooks/useReservation", () => {
  return {
    __esModule: true,  
    default: () => {
      return { addReservation: mockAddReservation };
    },
  };
});


describe("BlockoutModal", () => {
  const testProps = {
    isOpen: true,
    onClose: jest.fn(),
    startTime: new Date(2023, 5, 1, 9, 0, 0).toISOString(),
    endTime: new Date(2023, 5, 1, 10, 0, 0).toISOString(),
    event: { eventId: "1", eventDate: "2023-06-01", blocked: true } as Partial<IReservation>,
    eventId: "1",
  };

  it("renders correctly", () => {
    const { getByTestId } = render(<BlockoutModal {...testProps} />);

    expect(getByTestId('header')).toHaveTextContent('Selected Slot');
    expect(getByTestId('blockout')).toHaveTextContent('Block from 9:00:00 AM to 10:00:00 AM');
    expect(getByTestId('cancel')).toHaveTextContent('Cancel');
  });

  it("calls the onClose prop when the cancel button is clicked", () => {
    const { getByTestId } = render(<BlockoutModal {...testProps} />);
    fireEvent.click(getByTestId('cancel'));
    expect(testProps.onClose).toHaveBeenCalled();
  });

  it("calls addReservation and onClose when the Block Slot button is clicked", () => {
    const { getByText } = render(<BlockoutModal {...testProps} />);
    fireEvent.click(getByText('Block Slot'));
    expect(mockAddReservation).toHaveBeenCalledWith(testProps.event);
    expect(testProps.onClose).toHaveBeenCalled();
  });
});