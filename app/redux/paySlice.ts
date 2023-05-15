import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../utils/apiClient";
import { uniq } from "lodash";
import { PAYOUT_DOMAIN } from "../hooks/constants";
import { RootState } from ".";

interface InitialState {
  data: any[];
  loading: boolean;
  error: string | null;
  status: string;
}

export const fetchPayouts = createAsyncThunk(
  "payouts/fetchPayouts",
  async (
    data: {
      pagination?: { page: number; size: number };
      status?: string;
      sort?: "asc" | "desc";
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state: RootState = getState() as RootState;
      state.pays.status;
      if (state.pays.status !== data.status) {
        dispatch(paySlice.actions.resetState);
      }
      const payouts = await apiClient.get(PAYOUT_DOMAIN, {
        params: data,
      })
      return payouts;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
const initialState: InitialState = {
  data: [],
  loading: false,
  error: "",
  status: "",
};

const paySlice = createSlice({
  name: "pays",
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPayouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPayouts.fulfilled, (state, action) => {
      state.data = action.payload?.data;
      state.loading = false;
    });
    builder.addCase(fetchPayouts.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export default paySlice.reducer;
export const { resetState } = paySlice.actions;
export const selectFetchedPayouts = (state: RootState) => {
  return {
    loading: state.pays.loading,
    payouts: state.pays.data,
    error: state.pays.error,
  };
};
