import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../main";

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Define thunk for fetching data
export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(payload.url, {
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

// Define thunk for posting data
export const postData = createAsyncThunk(
  "api/postData",
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
// Define thunk for posting data
export const galleryData = createAsyncThunk(
  "api/galleryData",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const response = await axios.post(payload.url, payload.data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define thunk for updating data
export const updateData = createAsyncThunk(
  "api/updateData",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const response = await axios.put(payload.url, payload.data, {
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

// Define thunk for deleting data
export const deleteData = createAsyncThunk(
  "api/deleteData",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const response = await axios.delete(payload.url, {
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

// Create a slice for api operations
const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(galleryData.pending, (state) => {
        state.loading = true;
      })
      .addCase(galleryData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(galleryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export thunk action creators

export default apiSlice.reducer;
