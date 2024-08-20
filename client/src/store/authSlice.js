import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axios } from "../main";
const initialState = {
  profile: undefined,
  reqUserId: null,
  loading: false,
  menu: false,
  token: undefined,
};
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (auth, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.get("/api/user/isAuthenticated", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const userVerify = createAsyncThunk(
  "auth/userVerify",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/user/verify", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/user/log-out", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userUpdate = createAsyncThunk(
  "auth/userUpdate",
  async (user, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const res = await axios.put("/api/user/profile/" + user.id, user.data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define thunk for posting data
export const authData = createAsyncThunk(
  "api/authData",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const response = await axios.post(payload.url, payload.data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.profile = action.payload;
    },

    resetProfile: (state) => {
      state.profile = undefined;
    },
    toggleMenu: (state) => {
      state.menu = !state.menu;
    },
    handleLogout: (state) => {
      state.profile = undefined;
      state.reqUserId = null;
      state.token = undefined;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(authData.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(authData.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload.data;
      state.reqUserId = action.payload.reqUserId;
      state.loading = false;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(userUpdate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.profile = action.payload.data;
      state.loading = false;
    });
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(userVerify.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userVerify.fulfilled, (state, action) => {
      state.profile = action.payload.data;
      state.token = action.payload.token;
      state.reqUserId = action.payload.reqUserId;
      state.loading = false;
    });
    builder.addCase(userVerify.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(userLogout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.profile = undefined;
      state.reqUserId = null;
      state.token = undefined;
      state.loading = false;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { saveProfile, resetProfile, toggleMenu, handleLogout } =
  authSlice.actions;

export default authSlice.reducer;
