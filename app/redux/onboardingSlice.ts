import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebaseApp";
import { IUserProfile } from "../globaltypes";
import { RootState } from "./store";
import axios, { AxiosError } from "axios";
import { USERS_DOMAIN } from "../hooks/constants";
import apiClient from "../utils/apiClient";
import { isEmpty } from "lodash";

interface UserData extends Partial<IUserProfile> {}

export const updateOnboardingDetails = createAsyncThunk(
  "onboarding/updateOnboardingDetails",
  async (args: UserData, { rejectWithValue, dispatch, getState }) => {
    try {
      const updatedUser = (await apiClient.patch(USERS_DOMAIN, args)).data;

      const onBoardingData = (await apiClient.get(`${USERS_DOMAIN}/onboarding`))
        .data;
      return {
        ...updatedUser,
        ...onBoardingData,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchOnboardingDetails = createAsyncThunk("onboarding/fetch", async (args, {rejectWithValue}) => {
    try {
        const onBoardingData = (await apiClient.get(`${USERS_DOMAIN}/onboarding`))
        .data;
        const userData = (await apiClient.get(USERS_DOMAIN)).data;
        return {
            ...userData,
            ...onBoardingData
        }
    } catch (e) {
        return rejectWithValue(e);
    }
})

export const setHandle = createAsyncThunk(
  "onboarding/setHandle",
  async (handle: string, { rejectWithValue, dispatch }) => {
    try{
      const isHandleTaken = (await apiClient.get(`${USERS_DOMAIN}`, {
        params: {
          handle,
        }
      })).data
      return isHandleTaken
    }catch(e){
      rejectWithValue(e)
    }
  }
);

interface IReducer extends Partial<IUserProfile> {
  completed: {
    location: boolean;
    payout_method: boolean;
    profile: boolean;
  };
  onBoardingLoading: boolean;
  onBoardingError: SerializedError | null;
  isHandleTaken: boolean;
  handleCheckLoading: boolean;
}

const initialState: IReducer = {
  completed: {
    location: false,
    payout_method: false,
    profile: false,
  },
  onBoardingLoading: false,
  onBoardingError: null,
  isHandleTaken: false,
  handleCheckLoading: false,
};

const onBoardingSlice = createSlice({
  initialState,
  name: "onBoarding",
  reducers: {
    setFName: (state, action) => {
      state.fname = action.payload;
    },
    setLName: (state, action) => {
      state.lname = action.payload;
    },
    setMarketId: (state, action) => {
      state.marketId = action.payload;
    },
    setSubMarketId: (state, action) => {
      state.sub_market_id = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profile_pic_url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateOnboardingDetails.pending, (state, action) => {
      state.onBoardingLoading = true;
    });
    builder.addCase(updateOnboardingDetails.fulfilled, (state, action) => {
      state.onBoardingLoading = false;
      state.completed = action.payload.completed;
      state.fname = action.payload.fname ?? state.fname;
      state.lname = action.payload.lname ?? state.lname;
      state.marketId = action.payload.market_id ?? state.marketId;
      state.sub_market_id = action.payload.sub_market_id ?? state.sub_market_id;
      state.profile_pic_url =
        action.payload.profile_pic_url ?? state.profile_pic_url;
      state.handle = action.payload.handle ?? state.handle;
    });
    builder.addCase(updateOnboardingDetails.rejected, (state, action) => {
      state.onBoardingLoading = false;
      state.onBoardingError = action.error;
    }),
    builder.addCase(setHandle.pending, (state, action) => {
      state.handleCheckLoading = true;
    }),
    builder.addCase(setHandle.fulfilled, (state, action) => {
      state.handleCheckLoading = false;
      state.isHandleTaken = action.payload;
    }),
    builder.addCase(fetchOnboardingDetails.pending, (state, action) => {
      state.onBoardingLoading = true;
    }),
    builder.addCase(fetchOnboardingDetails.fulfilled, (state, action) => {
        state.onBoardingLoading = false;
        state.completed = action.payload.completed;
        state.fname = action.payload.fname ?? state.fname;
        state.lname = action.payload.lname ?? state.lname;
        state.marketId = action.payload.market_id ?? state.marketId;
        state.sub_market_id = action.payload.sub_market_id ?? state.sub_market_id;
        state.profile_pic_url =
            action.payload.profile_pic_url ?? state.profile_pic_url;
        state.handle = action.payload.handle ?? state.handle;
    }),
    builder.addCase(fetchOnboardingDetails.rejected, (state, action) => {
        state.onBoardingLoading = false;
        state.onBoardingError = action.error;
    })
  },
});

export default onBoardingSlice.reducer;

export const {
  setFName,
  setLName,
  setMarketId,
  setSubMarketId,
  setProfilePic,
} = onBoardingSlice.actions;

export const selectFName = (state: RootState) => state.onBoarding.fname;
export const selectLName = (state: RootState) => state.onBoarding.lname;
export const selectMarketId = (state: RootState) => state.onBoarding.marketId;
export const selectSubMarketId = (state: RootState) =>
  state.onBoarding.sub_market_id;
export const selectProfilePicUrl = (state: RootState) =>
  state.onBoarding.profile_pic_url;
export const selectHandle = (state: RootState) => ({
  handle: state.onBoarding.handle,
  isHandleTaken: state.onBoarding.isHandleTaken,
  handleCheckLoading: state.onBoarding.handleCheckLoading,
});
export const selectCompleted = (state: RootState) => state.onBoarding.completed;
export const selectOnBoardingLoading = (state: RootState) =>
  state.onBoarding.onBoardingLoading;
export const selectOnBoardingError = (state: RootState) =>
  state.onBoarding.onBoardingError;
