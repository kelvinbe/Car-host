import React from "react";
import EventModal from "./ReservedEventModal";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";

const testFunc = jest.fn();
const selectedReservation = {
  id: "a534393c-260e-4ecf-8612-cabc77e092f4",
  user_id: "8d0e65cb-979e-479a-8659-7a2fb603172c",
  vehicle_id: "776f49bc-8718-42fd-9015-88bc46f689a3",
  start_date_time: "2023-05-06T10:00:24.348Z",
  end_date_time: "2023-05-06T16:09:33.930Z",
  type: "HOURLY",
  status: "ACTIVE",
  vehicle: {
    id: "776f49bc-8718-42fd-9015-88bc46f689a3",
    user_id: "ddbc2b0d-95dc-4a19-9b6a-f9a3c1204e31",
    station_id: "bfc0c07f-0f73-43a8-983f-edebc1dd8833",
    color: "purple",
    seats: 8,
    plate: "SB24VIS",
    make: "Bentley",
    model: "V90",
    year: 1938,
    hourly_rate: 95,
    status: "BLOCKED",
    tracking_device_id: "0e3d0b0a-d080-4201-8614-bbccc0122214",
    pictures: [
      "https://loremflickr.com/640/480/transport",
      "https://loremflickr.com/640/480/transport",
      "https://loremflickr.com/640/480/transport",
      "https://loremflickr.com/640/480/transport",
    ],
    transmission: "DIRECT_DRIVE",
    host: {
      id: "ddbc2b0d-95dc-4a19-9b6a-f9a3c1204e31",
      fname: "Darwin",
      lname: "Lang",
      email: "Uriel.Morar63@gmail.com",
      handle: "Isobel22",
      phone: "1-852-613-5405",
      profile_pic_url:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/329.jpg",
      user_type: "HOST",
      status: "NONACTIVE",
      connected_account_id: "324ef24f-9170-42ea-b405-97fc2cac980c",
      customer_id: "a7ae8c4e-1992-4587-a403-97e828d58eae",
      description:
        "Odio quis tempore adipisci consectetur odio. Quibusdam nulla laborum fugit provident aperiam eaque explicabo nam. Voluptatem nostrum ab cupiditate asperiores neque eum placeat molestiae. Aliquid ex nihil libero autem quisquam nihil facilis ducimus molestias. Iusto quae similique animi ab aliquid voluptas.",
      uid: "644810c4-0430-4af9-bb5d-7ed08fe8ff63",
      market_id: "e7ae23ad-5737-42a7-9416-fc692a4f7877",
      sub_market_id: "0fcb2bce-143f-4e2a-8698-61af0aba21eb",
      is_admin: true,
    },
    station: {
      id: "bfc0c07f-0f73-43a8-983f-edebc1dd8833",
      name: "Lamar Mayert",
      description: "nostrum",
      image: "https://loremflickr.com/640/480/city",
      sub_market_id: "0fcb2bce-143f-4e2a-8698-61af0aba21eb",
      user_id: "9ee18e8a-b7e6-47ee-a05d-53e8dba28c13",
      latitude: -9,
      longitude: -112,
      status: "ACTIVE",
      market: {
        id: "e7ae23ad-5737-42a7-9416-fc692a4f7877",
        country: "South Africa",
        currency: "ZSD",
        name: "South Africa",
        status: "ACTIVE",
      },
      sub_market: {
        id: "0fcb2bce-143f-4e2a-8698-61af0aba21eb",
        market_id: "ea2cb0ec-57a3-4c7a-8a84-5ed2e654ab20",
        name: "New Crystelbury",
      },
    },
  },
  payment: {
    id: "b228786b-5d90-4efb-b408-6d733c3ec980",
    payment_type: "e9d64c68-2263-4b04-8b9c-332b2ebdcc14",
    account_number: "ullamrmxpelfszpp",
    authorization_code: "dolore",
    paymentToken: "bc8e8074-2b81-44bb-9554-6d309d752755",
    amount: 516,
    tax: 40,
    date_time: "2023-05-07T02:56:16.915Z",
    status: "OTHER",
    stripe_payment_id: "e5b00448-86b3-4ea5-9b53-c0da5694b995",
    user_id: "fb272d81-518e-432e-8697-62ec93fc15f4",
    reservation_id: "a534393c-260e-4ecf-8612-cabc77e092f4",
  },
  user: {
    id: "8d0e65cb-979e-479a-8659-7a2fb603172c",
    fname: "Arturo",
    lname: "Lind",
    email: "Francesca_Borer@gmail.com",
    handle: "Florence.Romaguera",
    phone: "964.337.2308 x647",
    profile_pic_url:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1107.jpg",
    user_type: "CUSTOMER",
    status: "BANNED",
    connected_account_id: "48bba4ab-152d-4345-861a-829f13ee2d30",
    customer_id: "61731090-d4a4-4fcf-80fe-7dadfc724331",
    description:
      "Recusandae accusantium recusandae veritatis. Beatae architecto error officia voluptatem non sequi esse. Vel ipsam voluptatibus eos non quidem animi quaerat consequatur. Nobis qui maxime itaque architecto in illum voluptate laborum ratione. Nam praesentium laudantium nostrum reprehenderit voluptatem possimus nemo dignissimos quo. Amet dignissimos perferendis cupiditate maiores culpa sit delectus nobis.",
    uid: "84e12f10-83db-4735-9772-11b06104d16d",
    market_id: "e7ae23ad-5737-42a7-9416-fc692a4f7877",
    sub_market_id: "647006af-311c-4098-a23e-e0c257f5089f",
    is_admin: false,
  },
};

describe("It tests the reserved event modal component", () => {
  it("Tests if the component mounts", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <EventModal
          selectedReservation={selectedReservation}
          isOpen
          onClose={testFunc}
          eventId={'"a534393c-260e-4ecf-8612-cabc77e092f4"'}
        />
      </Provider>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('market').textContent).toBe('Reservation Market: South Africa');
    expect(screen.getByTestId('station').textContent).toBe('Station: Lamar Mayert');
    expect(screen.getByTestId('customer').textContent).toBe("Customer: Arturo Lind");
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it("Tests if the component mounts", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <EventModal
          selectedReservation={selectedReservation}
          isOpen
          onClose={testFunc}
          eventId={'"a534393c-260e-4ecf-8612-cabc77e092f4"'}
        />
      </Provider>
    );
    const close = screen.getByText("Close");
    fireEvent.click(close);
    expect(testFunc).toBeCalled();
  });
});
