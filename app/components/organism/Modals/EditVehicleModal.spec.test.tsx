import { Middleware, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import vehicleReducer, { fetchVehicle } from "../../../redux/vehiclesSlice";
import { IVehicle } from "../../../globaltypes";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock('../../../utils/apiClient', () => ({
  create: jest.fn().mockReturnValue({
      headers: {
          "x-user": "HOST", 
          "ngrok-skip-browser-warning": true
      },
      interceptors: {
          request: {
              use: jest.fn().mockImplementation((config) => {
                  return {
                      ...config,
                      headers: {
                          ...config.headers,
                          "Authorization": `Bearer ${'mocked_token'}`
                      }
                  }
              })
          },
          response: {
            use: jest.fn().mockImplementation(() => ({
                  data: 'mocked data',
                  message: 'mocked message',
                  status: 'mocked status'
              }))
            }
          },
  }),
  db_user: {
      getUser: jest.fn().mockResolvedValue({
          getIdToken: jest.fn().mockResolvedValue('mocked_token')
        })
  },
}));

const createMockStore = () => {
  const mockAsyncActions: Middleware = ({ dispatch }) => next => action => {
    if (action.type === 'vehicles/fetchVehicle/pending') {
      return dispatch({
        type: 'vehicles/fetchVehicle/fulfilled',
        payload: { 
            "id": "3f625e29-8648-4dae-b6fd-7cc7b0b12fd4",
            "user_id": "2503d950-4ed7-402e-b97b-0f6471e948d8",
            "station_id": "0c2a2303-5be8-4200-8349-35d70f6b8a66",
            "color": "brown",
            "seats": 5,
            "plate": "ZX74OPY",
            "make": "Mazda",
            "model": "Grand Cherokee",
            "year": 1927,
            "hourly_rate": 56,
            "status": "ACTIVE",
            "tracking_device_id": "51dee53b-1316-4d6f-872f-4f2c04a4ecc5",
            "pictures": [
              "https://loremflickr.com/640/480/transport",
              "https://loremflickr.com/640/480/transport",
              "https://loremflickr.com/640/480/transport",
              "https://loremflickr.com/640/480/transport"
            ],
            "transmission": "AUTOMATIC",
          } as Partial<IVehicle>,
        });
      }
      return next(action);
    };
    
    const middleware = getDefaultMiddleware().concat(mockAsyncActions);
    
    return configureStore({
      reducer: {
        vehicles: vehicleReducer,
      },
      middleware,
    });
  };
  
  const store = createMockStore();
  
  import EditVehicleModal from "./EditVehicleModal";
describe('EditVehicleModal', () => {
    const onCloseMock = jest.fn()
    const vehicle_id = '1'
    const vehicles = [] as IVehicle[]
    let isOpen = true
  
    beforeEach(() => {
      render(
        <Provider store={store}>
          <EditVehicleModal 
            isOpen={isOpen}
            onClose={onCloseMock}
            vehicle_id={vehicle_id}
          />
        </Provider>
      )
    })
  
    test('renders modal', () => {
      expect(screen.getByTestId('edit-vehicle-modal')).toBeInTheDocument()
    })
  
    test('renders form fields correctly', () => {
      expect(screen.getByPlaceholderText('ABC-123')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Toyota')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Camry')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('2018')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('$')).toBeInTheDocument()
    })
  
    test('renders the modal close button', () => {
      expect(screen.getByTestId('close-modal-button')).toBeInTheDocument()
    })
  
    test('closes modal when close button is clicked', () => {
      fireEvent.click(screen.getByTestId('close-modal-button'))
      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })

  })


