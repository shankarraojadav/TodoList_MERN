import { createSlice } from "@reduxjs/toolkit";
import { deleteOne } from "../service/api";

const initialState = {
  data: [],
  isLoading: false,
  delete_success: false,
  error: null,
};

const deleteOneSlice = createSlice({
  name: "deleteOnes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOne.fulfilled, (state, action) => {
        
        state.data = state.data.filter(
          (item) => item._id !== action.payload.id
        );
        state.delete_success = true;
      })
      .addCase(deleteOne.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default deleteOneSlice.reducer;
