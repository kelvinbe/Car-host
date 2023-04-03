import { dIUserProfile, dIUserSettings } from './../../types';
import { RootState } from './index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { app, auth } from '../../firebase/firebaseApp';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { SETTINGS_ENDPOINT, USER_ENDPOINT } from '../../hooks/constants';

interface IProfileState {
  data: dIUserProfile;
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
  data: {
    fname: '',
    lname: '',
    email: '',
    handle: '',
    phone: '',
    profile_pic_url: '',
    user_type: 'CUSTOMER',
    status: 'ACTIVE',
    customer_id: '',
    DriverCredentials: {
      drivers_licence_front: '',
      drivers_licence_back: '',
    },
    user_settings: {
      id: '',
      notifications_enabled: true,
      user_id: '',
    },
  },
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
  async (_args, { rejectWithValue }) => {
    return await getAuth(app)
      ?.currentUser?.getIdToken(true)
      .then(async token => {
        return await axios
          .get(USER_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            const providers = auth?.currentUser?.providerData.map(provider => provider.providerId);
            return {
              providers,
              data: data.data,
            };
          })
          .catch(e => {
            return rejectWithValue(e);
          });
      })
      .catch(e => {
        return rejectWithValue(e);
      });
  }
);

export const updateUserData = createAsyncThunk(
  'user/updatedata',
  (data: { uid?: string; data: { [key: string]: any } } | null, { rejectWithValue, dispatch }) => {
    return getAuth(app)
      ?.currentUser?.getIdToken()
      ?.then(async token => {
        return await axios
          .put(
            USER_ENDPOINT,
            { data },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'x-user': 'CUSTOMER',
              },
            }
          )
          .then(res => {
            dispatch(fetchUserData({}));
            return null;
          })
          .catch(e => {
            rejectWithValue(e);
          });
      })
      .catch(e => {
        rejectWithValue(e);
      });
  }
);

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
export const selectPasswordChanged = (state: RootState) => state.user.passwordChanged;
export const selectStripeCustomerId = (state: RootState) => state.user.data.customer_id;
export const selectNotificationsEnabled = (state: RootState) =>
  state.user.data.user_settings?.notifications_enabled;
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
