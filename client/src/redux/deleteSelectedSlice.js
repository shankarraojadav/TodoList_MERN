import { createSlice } from "@reduxjs/toolkit";
import { updateList } from "../service/api";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const updateListSlice= createSlice({
  name: "addTodos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(updateList.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

export default updateListSlice.reducer;
