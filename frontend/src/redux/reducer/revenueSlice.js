import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import AxiosInstance from "../utils/apiConnector";
import { revenueEndPoints } from "../api";

const {
  ADMIN_REVENUE_API,
  SUPERADMIN_REVENUE_API,
  CITY_REVENUE_API,
  ADMIN_CITY_REVENUE_API,
  ADMIN_CITIES_REVENUE_API,
  ADMINS_DETAILS_API,
} = revenueEndPoints;

// ------------------ adminRevenueApi -------------------
export const adminRevenueApi = createAsyncThunk(
  "revenue/adminRevenue",
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
  "revenue/superadminRevenue",
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
  "revenue/cityRevenue",
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

// ------------------ adminCityRevenueApi -------------------
export const adminCityRevenueApi = createAsyncThunk(
  "revenue/adminCityRevenue",
  async ({ cityId }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(ADMIN_CITY_REVENUE_API, { cityId });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(
        error?.message || "Error while fetching admin city revenue"
      );
    }
  }
);

// ------------------ adminCitiesRevenueApi -------------------
export const adminCitiesRevenueApi = createAsyncThunk(
  "revenue/adminCitiesRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(ADMIN_CITIES_REVENUE_API);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(
        error?.message || "Error while fetching admin cities revenue"
      );
    }
  }
);

// ------------------ adminsDetailsApi -------------------
export const adminsDetailsApi = createAsyncThunk(
  "auth/adminsDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(ADMINS_DETAILS_API);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(
        error?.message || "Error while fetching admins data"
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
      })

      // ------------------- adminCityRevenueApi -------------------
      .addCase(adminCityRevenueApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminCityRevenueApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(adminCityRevenueApi.rejected, (state, action) => {
        state.isLoading = false;
      })

      // ------------------- adminCitiesRevenueApi -------------------
      .addCase(adminCitiesRevenueApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminCitiesRevenueApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(adminCitiesRevenueApi.rejected, (state, action) => {
        state.isLoading = false;
      })

      // ------------------- adminsDetailsApi -------------------
      .addCase(adminsDetailsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminsDetailsApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(adminsDetailsApi.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default revenueSlice.reducer;
