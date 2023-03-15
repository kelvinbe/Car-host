import {
  DRIVER_CREDENTIALS_ENDPOINT,
  FETCH_ONBOARDING,
  PAYMENT_METHOD_ENDPOINT,
  USER_ENDPOINT,
} from './../../hooks/constants';
import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase/firebaseApp';
import { RootState } from '.';
import { z } from 'zod';
import { isNull } from 'lodash';

interface ICard {
  cvv: string;
  card_number: string;
  name: string;
  exp: string;
}

interface IReducerState {
  drivers_license: {
    front: string,
    back: string
  };
  payment_method: null | {
    type: 'card' | 'mpesa' | 'cash';
    card?: {
      card_number: string;
      exp_month: number;
      exp_year: number;
      cvc: string;
      name: string;
    };
  };
  location: {
    market_id: string;
    sub_market_id: string;
  };
  completed: {
    drivers_license: boolean;
    payment_method: boolean;
    location: boolean;
  } | null;
}

const initialState: IReducerState = {
  drivers_license: {
    front: '',
    back: '',
  },
  payment_method: null,
  location: {
    market_id: '',
    sub_market_id: '',
  },
  completed: null,
};

/**
 * @todo move this to a central file
 */
interface IResponse {
  completed: {
    drivers_licensce: boolean;
    payment_method: boolean;
    location: boolean;
  };

  message: string;
  status: string;
}

interface IUpdateUser {
  market_id: string;
  sub_market_id: string;
}

export const onBoardingApi = createApi({
  reducerPath: 'onBoardingApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: async (headers, { getState }) => {
      await getAuth(app)
        ?.currentUser?.getIdToken()
        .then(token => {
          headers.set('Authorization', `Bearer ${token}`);
        })
        .catch(err => {
          /**
           * @todo: logrocket implementation
           */
        });
    },
  }),
  endpoints: builder => ({
    getOnboarding: builder.query<IResponse, any>({
      query: () => FETCH_ONBOARDING,
      transformResponse: (response: any) => {
        return response.data;
      },
      transformErrorResponse: (response: any) => {
        return response?.data || response;
      },
    }),
    updateDriverCredentials: builder.mutation<Partial<IResponse>, { drivers_license: {front: string, back: string} }>({
      query: body => ({
        url: DRIVER_CREDENTIALS_ENDPOINT,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: any) => {
        return response?.data || response;
      },
      transformErrorResponse: (response: any) => {
        return response?.data || response;
      },
    }),
    updateOnboardinProfile: builder.mutation<Partial<IResponse>, IUpdateUser>({
      query: body => {
        return {
          url: USER_ENDPOINT,
          method: 'PUT',
          body,
        };
      },
    }),
    addOnboardingPaymentMethod: builder.mutation<
      Partial<IResponse>,
      Partial<ICard> & { customer_id?: string; type?: 'card' | 'mpesa' | 'cash' }
    >({
      query: body => ({
        /**
         * @description we use the type parameter to let the backend know what type of payment method we are adding
         */
        url: PAYMENT_METHOD_ENDPOINT,
        method: 'POST',
        body:
          body?.type === 'card'
            ? {
                card_number: body.card_number,
                exp_month: body?.exp?.split('/')?.[0],
                exp_year: body?.exp?.split('/')?.[1],
                cvc: body.cvv,
                customer_id: body.customer_id,
              }
            : null,
        params: {
          type: body.type ?? 'card',
        },
      }),
    }),
  }),
});

export const {
  useGetOnboardingQuery,
  useUpdateDriverCredentialsMutation,
  useUpdateOnboardinProfileMutation,
  useAddOnboardingPaymentMethodMutation,
} = onBoardingApi;

const onBoardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnBoardingDriversLicenseFront: (state, action) => {
      state.drivers_license.front = action.payload;
    },
    setOnBoardingDriversLicenseBack: (state, action) => {
      state.drivers_license.back = action.payload;
    },
    setOnBoardingPaymentMethod: (state, action) => {
      state.payment_method = action.payload;
    },
    setOnBoardingLocation: (state, action) => {
      state.location = action.payload;
      const completed = state.completed;
      if (completed) {
        completed.location = true;
      }
    },
    resetOnboarding: state => {
      state.drivers_license = {
        front: '',
        back: '',
      };
      state.payment_method = null;
      state.location = {
        market_id: '',
        sub_market_id: '',
      };
      if (!isNull(state.completed)) {
        state.completed.drivers_license = false;
        state.completed.payment_method = false;
        state.completed.location = false;
      }
      
    },
    /**
     * @name setOnBoarding
     * @description note, this will just set the completed object and not the entire onboading object
     */
    setOnBoarding: (state, action) => {
      state.completed = {
        ...state.completed,
        ...action.payload,
      };
    },
  },
});

export default onBoardingSlice.reducer;

export const {
  setOnBoardingDriversLicenseFront,
  setOnBoardingDriversLicenseBack,
  setOnBoardingPaymentMethod,
  resetOnboarding,
  setOnBoarding,
  setOnBoardingLocation,
} = onBoardingSlice.actions;

export const selectOnBoardingDriversLicense = (state: RootState) =>
  state.onboarding.drivers_license;
export const selectOnBoardingPaymentMethod = (state: RootState) => state.onboarding.payment_method;
export const selectOnBoardingCompleted = (state: RootState) => state.onboarding.completed;
export const selectOnBoardingLocation = (state: RootState) => state.onboarding.location;