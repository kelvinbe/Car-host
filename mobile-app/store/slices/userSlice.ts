import { IUserProfile, dIUserProfile, dIUserSettings } from './../../types';
import { RootState } from './index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { app, auth } from '../../firebase/firebaseApp';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { SETTINGS_ENDPOINT, USER_ENDPOINT } from '../../hooks/constants';
import apiClient from '../../utils/apiClient';

interface IProfileState {
  data: IUserProfile | null;
  providers?: string[];
  passwordChanged?: boolean;
  getProfileLoading?: boolean;
  getProfileError?: any;
  updateProfileLoading?: boolean;
  updateProfileError?: any;
  updateSettingsLoading?: boolean;
  updateSettingsError?: any;
}

const initialState: IProfileState = {
  data: null,
  providers: [],
  passwordChanged: false,
  getProfileLoading: false,
  getProfileError: null,
  updateProfileLoading: false,
  updateProfileError: null,
  updateSettingsLoading: false,
  updateSettingsError: null,
};

export const fetchUserData = createAsyncThunk<any, any>(
  'user/fetchdata',
  async (undefined, { rejectWithValue }) => {
    try {
      const data = (await apiClient.get(USER_ENDPOINT)).data;
      return {
        data,
        providers: getAuth(app).currentUser?.providerData.map(provider => provider.providerId),
      }
    } catch(e) {
      rejectWithValue(e)
    }
});

export const updateUserData = createAsyncThunk('user/update', (data: Partial<IUserProfile>, {rejectWithValue, dispatch})=>{
  return apiClient.patch(USER_ENDPOINT, data).then(()=>{
    dispatch(fetchUserData({}));
    return null
  }).catch(rejectWithValue)
})

export const updateSettings = createAsyncThunk(
  'user/updatesettings',
  (data: Partial<dIUserSettings>, { rejectWithValue, dispatch }) => {
    return getAuth(app)
      ?.currentUser?.getIdToken()
      ?.then(async token => {
        return await axios
          .put(
            SETTINGS_ENDPOINT,
            { ...data },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'x-user': 'CUSTOMER',
              },
            }
          )
          .then(() => {
            dispatch(fetchUserData({}));
            return null;
          })
          .catch(rejectWithValue);
      })
      .catch(rejectWithValue);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    clearUserState: state => {
      state = initialState;
    },
    setPasswordChanged: state => {
      state.passwordChanged = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.getProfileLoading = true;
    }),
      builder.addCase(fetchUserData.rejected, (state, action) => {
        state.getProfileLoading = false;
        state.getProfileError = action.error;
      }),
      builder.addCase(fetchUserData.fulfilled, (state, action) => {
        console.log(action.payload.data.data)
        state.data = action.payload.data;
        state.providers = action.payload.providers;
        state.getProfileLoading = false;
      });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.updateProfileLoading = false;
    }),
      builder.addCase(updateUserData.rejected, (state, action) => {
        state.updateProfileLoading = false;
        state.updateProfileError = action.error;
      }),
      builder.addCase(updateUserData.pending, (state, action) => {
        state.updateProfileLoading = true;
      }),
      builder.addCase(updateSettings.pending, (state, action) => {
        state.updateSettingsLoading = true;
      }),
      builder.addCase(updateSettings.rejected, (state, action) => {
        state.updateSettingsLoading = false;
        state.updateSettingsError = action.error;
      }),
      builder.addCase(updateSettings.fulfilled, (state, action) => {
        state.updateSettingsLoading = false;
      });
  },
});

export default userSlice.reducer;

// actions
export const { clearUserState, setPasswordChanged } = userSlice.actions;

// selectors
export const selectUserProfile = (state: RootState) => state.user.data;
export const selectAuthProviders = (state: RootState) => state.user.providers;
export const selectPasswordChanged = (state: RootState) => state.user?.passwordChanged;
export const selectStripeCustomerId = (state: RootState) => state.user.data?.customer_id;
export const selectNotificationsEnabled = (state: RootState) =>
  state.user.data?.user_settings?.notifications_enabled ?? false; 
export const selectUpdateSettings = (state: RootState) => {
  return {
    loading: state.user.updateSettingsLoading,
    error: state.user.updateSettingsError,
  };
};

export const selectUpdateProfile = (state: RootState) => {
  return {
    loading: state.user.updateProfileLoading,
    error: state.user.updateProfileError,
  };
};
