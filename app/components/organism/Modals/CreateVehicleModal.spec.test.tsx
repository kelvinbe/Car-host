import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import CreateVehicleModal from "./CreateVehicleModal";
import { IVehicleDetails } from "../../../globaltypes";
import userEvent from '@testing-library/user-event';
import { MARKETS_API, STATIONS_API, VEHICLES_DOMAIN } from '../../../hooks/constants';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

const server = setupServer(
  rest.post(VEHICLES_DOMAIN, (req, res, ctx) => {
    return res(ctx.json({}))
  }),
  rest.get(STATIONS_API, (req, res, ctx) => {
    return res(ctx.json({
        data: [
            {
                "id": "b292c1d3-1918-46fd-99d2-f5fd34bbc722",
                "name": "Troy Goodwin",
                "description": "minus",
                "image": "https://loremflickr.com/640/480/city",
                "sub_market_id": "ab58c525-077c-48e4-b099-5ecc0eda9219",
                "user_id": "bf62d12e-4cea-4fb4-939a-b8628bae9d3f",
                "latitude": -31,
                "longitude": -83,
                "status": "ACTIVE",
                "sub_market": {
                    "id": "ab58c525-077c-48e4-b099-5ecc0eda9219",
                    "market_id": "0cb3742f-3ae0-4a38-b341-008f7b3e2942",
                    "name": "Belleville"
                }
            }
        ]
    }))
  }),
)
const handleClose = jest.fn();

beforeAll(() => {
    server.listen()
})
beforeEach(() => {
    fetchMock.resetMocks()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("<CreateVehicleModal />", () => {
  test("renders the CreateVehicleModal component", () => {

    const { getByText } = render(
        <Provider store={store}>
            <CreateVehicleModal isOpen={true} onClose={handleClose} />
        </Provider>
    );

    expect(getByText("Create Vehicle")).toBeInTheDocument();
  });

  test("allows user to fill out the form", async () => {
    render(
        <Provider store={store}>
            <CreateVehicleModal isOpen={true} onClose={handleClose} />
        </Provider>
    );

    userEvent.type(screen.getByPlaceholderText('ABC-123'), 'ABC-DEF');
    userEvent.type(screen.getByPlaceholderText('Toyota'), 'Toyota');
    userEvent.type(screen.getByPlaceholderText('Camry'), 'Camry');
    userEvent.type(screen.getByPlaceholderText('2018'), '2018');
    userEvent.type(screen.getByPlaceholderText('$'), '10');


    expect(screen.getByPlaceholderText('ABC-123')).toHaveValue('ABC-DEF');
    expect(screen.getByPlaceholderText('Toyota')).toHaveValue('Toyota');
    expect(screen.getByPlaceholderText('Camry')).toHaveValue('Camry');
    expect(screen.getByPlaceholderText('2018')).toHaveValue(2018);
    expect(screen.getByPlaceholderText('$')).toHaveValue(10);
  });

});
