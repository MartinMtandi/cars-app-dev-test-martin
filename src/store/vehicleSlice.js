import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getVehicleById } from '../services/vehicleService';

export const fetchVehicleById = createAsyncThunk(
  'vehicle/fetchById',
  async (id) => {
    const response = await getVehicleById(id);
    return response;
  }
);

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default vehicleSlice.reducer;
