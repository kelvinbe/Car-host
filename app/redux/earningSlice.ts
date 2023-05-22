import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";
import { EARNINGS_API } from "../hooks/constants";
import apiClient from "../utils/apiClient";
import { IAnalyticsData } from "../globaltypes";

export const fetchEarnings = createAsyncThunk(
  "earnings/fetchEarnings",
  async (
    data: {
        vehicle_id?: string,
        time_range?: string,
      },
    {rejectWithValue}
  ) => {
    try {
      const earnings = await apiClient.get(EARNINGS_API, { params: data });
      return earnings.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

interface InitialState {
  data: IAnalyticsData[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: false,
  error: "",
};

const earningSlice = createSlice({
  name: "earnings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEarnings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEarnings.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchEarnings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default earningSlice.reducer;
export const selectEarnings = (state: RootState) => {
  return {
    earnings: state.earnings.data,
    loading: state.earnings.loading,
    error: state.earnings.error,
  };
};
