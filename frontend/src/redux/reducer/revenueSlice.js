import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import AxiosInstance from "../utils/apiConnector";
import { revenueEndPoints } from "../api";

const { ADMIN_REVENUE_API, SUPERADMIN_REVENUE_API, CITY_REVENUE_API } =
  revenueEndPoints;

// ------------------ adminRevenueApi -------------------
export const adminRevenueApi = createAsyncThunk(
  "auth/adminRevenue",
  async ({ adminId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADMIN_REVENUE_API, {
        userId: adminId,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(
        error?.message || "Error while fetching admin revenue"
      );
    }
  }
);

// ------------------ superadminRevenueApi -------------------
export const superadminRevenueApi = createAsyncThunk(
  "auth/superadminRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(SUPERADMIN_REVENUE_API);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(
        error?.message || "Error while fetching superadmin revenue"
      );
    }
  }
);

// ------------------ cityRevenueApi -------------------
export const cityRevenueApi = createAsyncThunk(
  "auth/cityRevenue",
  async ({ cityId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(CITY_REVENUE_API, { cityId });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(
        error?.message || "Error while fetching city revenue"
      );
    }
  }
);

// --------------- Slice ---------------
const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ------------------- adminRevenueApi -------------------
      .addCase(adminRevenueApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminRevenueApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(adminRevenueApi.rejected, (state, action) => {
        state.isLoading = false;
      })

      // ------------------- superadminRevenueApi -------------------
      .addCase(superadminRevenueApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(superadminRevenueApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(superadminRevenueApi.rejected, (state, action) => {
        state.isLoading = false;
      })

      // ------------------- cityRevenueApi -------------------
      .addCase(cityRevenueApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cityRevenueApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(cityRevenueApi.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default revenueSlice.reducer;
