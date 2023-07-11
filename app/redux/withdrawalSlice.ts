import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../utils/apiClient";
import { PAYOUT_REPORT_API, WITHDRAWALS_API } from "../hooks/constants";
import { RootState } from ".";
import { IPayout, IUserProfile, IWithdrawals, PaginationSupportState, PayoutMethods, asyncThinkFetchParams } from "../globaltypes";
import LogRocket from "logrocket";
import { isEmpty } from "lodash";

type payout_report = {
  /**
   * @description - total amount of money earned by the host on the platform
   */
  all_time: number,
  /**
   * @description - amount they can withdraw
   */
  available: number,
  /**
   * @description - the currency of the amount
   */
  currency: string,
}

export const fetchPayoutReport = createAsyncThunk<Partial<payout_report>, null | undefined>("withdrawals/fetchPayoutReport", async(args: null| undefined = null, {rejectWithValue})=>{
  try {
    const res = await apiClient.get(`${PAYOUT_REPORT_API}`)
    return res.data
  } catch (e) {
    LogRocket.error(e)
    return rejectWithValue(e)
  }
})

export const fetchWithdrawals = createAsyncThunk(
  "withdrawals/fetchWithdrawals",
  async (
    data: Partial<asyncThinkFetchParams<IWithdrawals>> | null | undefined = null,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const currentParams = (getState() as RootState).withdrawals;
      const prev_search = isEmpty(currentParams.current_search) ? undefined : currentParams.current_search
      const current_search = isEmpty(data?.search) ? prev_search : data?.search
      const search = isEmpty(current_search) ? undefined : current_search === "__empty__" ? undefined : current_search

      const params = {
        page: data?.page ?? currentParams.current_page,
        size: data?.size ?? currentParams.current_size,
        sort: data?.sort ?? currentParams.current_sort,
        sort_by: data?.sort_by ?? currentParams.current_sort_by ?? undefined,
        search: search
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
      await apiClient.patch(`${WITHDRAWALS_API}`, updateData, {
        params: {
          withdrawal_id: updateData.id,
        }
      })
      await dispatch(fetchWithdrawals());
    } catch (error) {
      LogRocket.error(error);
      rejectWithValue(error);
    }
  }
);

interface InitialState extends Partial<PaginationSupportState<IWithdrawals>> {
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
  loadingPayoutReport: boolean;
  errorPayoutReport: string | null;
  payoutReport: Partial<payout_report> | null;
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
  loadingPayoutReport: false,
  errorPayoutReport: null,
  payoutReport: null
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
    builder.addCase(fetchPayoutReport.pending, (state)=>{
      state.loadingPayoutReport = true;
      state.errorPayoutReport = null;
    })
    builder.addCase(fetchPayoutReport.fulfilled, (state, action)=>{
      state.loadingPayoutReport = false;
      state.errorPayoutReport = null;
      state.payoutReport = action.payload;
    })
    builder.addCase(fetchPayoutReport.rejected, (state, action)=>{
      state.loadingPayoutReport = false;
      state.errorPayoutReport = action.payload as string;
    })
  },
});

export default withdrawalSlice.reducer;
export const { resetState, updateParams } = withdrawalSlice.actions;
export const selectWithdrawals = (state: RootState) => {
  return {
    withdrawals: state?.withdrawals?.data ?? [],
    loading: state?.withdrawals?.loading ?? false,
    error: state?.withdrawals?.error ?? null,
    status: state?.withdrawals?.status,
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
    current_page: state?.withdrawals?.current_page ?? 1,
    current_size: state?.withdrawals?.current_size ?? 10,
    current_sort: state?.withdrawals?.current_sort ?? "desc",
    current_search: state?.withdrawals?.current_search ?? "__empty__",
  };
}

export const selectPayoutReportFeedback = (state: RootState) => {
  return {
    loading: state.withdrawals.loadingPayoutReport,
    error: state.withdrawals.errorPayoutReport,
    data: state.withdrawals.payoutReport
  }
}


