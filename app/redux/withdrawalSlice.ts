import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../utils/apiClient";
import { WITHDRAWALS_API } from "../hooks/constants";
import { RootState } from ".";
import { IPayout, IUserProfile, IWithdrawals, PaginationSupportState, PayoutMethods, asyncThinkFetchParams } from "../globaltypes";
import LogRocket from "logrocket";

export const fetchWithdrawals = createAsyncThunk(
  "withdrawals/fetchWithdrawals",
  async (
    data: Partial<asyncThinkFetchParams> | null | undefined = null,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const currentParams = (getState() as RootState).withdrawals;
      const params = {
        page: data?.page ?? currentParams.current_page,
        size: data?.size ?? currentParams.current_size,
        sort: data?.sort ?? currentParams.current_sort,
      };
      dispatch(updateParams(params));
      const res = await apiClient.get(WITHDRAWALS_API, {
        params,
      });
      return res.data;
    } catch (e) {
      LogRocket.error(e);
      rejectWithValue(e);
    }
  }
);

export const updateWithdrawal = createAsyncThunk(
  "withdrawals/updateWithdrawals",
  async (updateData: Partial<IWithdrawals>, { rejectWithValue, dispatch }) => {
    try {
      await apiClient.patch(`${WITHDRAWALS_API}/${updateData.id}`, updateData)
      await dispatch(fetchWithdrawals({}));
    } catch (error) {
      LogRocket.error(error);
      rejectWithValue(error);
    }
  }
);

interface InitialState extends Partial<PaginationSupportState> {
  data: Partial<IWithdrawals & Partial<{
    user: Partial<IUserProfile>
    payout: Partial<IPayout>
    payout_method: Partial<PayoutMethods>
  }>>[];
  loading: boolean;
  error: string | null;
  status: string;
  updateLoading: boolean;
  updateError: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: false,
  error: "",
  status: "",
  current_page: 1,
  current_size: 10,
  updateError: null,
  updateLoading: false,
};

const withdrawalSlice = createSlice({
  name: "withdrawals",
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = [];
    },
    updateParams: (state, action) => {
      state.current_page = action.payload.page;
      state.current_size = action.payload.size;
      state.current_sort = action.payload.sort;
      state.current_search = action.payload.search;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWithdrawals.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchWithdrawals.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchWithdrawals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateWithdrawal.pending, (state) => {
      state.updateLoading = true;
      state.updateError = null;
    })
    builder.addCase(updateWithdrawal.fulfilled, (state) => {
      state.updateLoading = false;
      state.updateError = null;
    })
    builder.addCase(updateWithdrawal.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload as string;
    })
  },
});

export default withdrawalSlice.reducer;
export const { resetState, updateParams } = withdrawalSlice.actions;
export const selectWithdrawals = (state: RootState) => {
  return {
    withdrawals: state.withdrawals.data,
    loading: state.withdrawals.loading,
    error: state.withdrawals.error,
    status: state.withdrawals.status,
  };
};


export const selectUpdateWithdrawalFeedback = (state: RootState) => {
  return {
    loading: state.withdrawals.updateLoading,
    error: state.withdrawals.updateError,

  }
}

export const selectWithdrawalsPagination = (state: RootState) => {
  return {
    current_page: state.withdrawals.current_page,
    current_size: state.withdrawals.current_size,
    current_sort: state.withdrawals.current_sort,
    current_search: state.withdrawals.current_search,
  };
}


