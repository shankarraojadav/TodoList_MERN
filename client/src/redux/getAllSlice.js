import { createSlice } from "@reduxjs/toolkit";
import { deleteOne, getAllLists, updateTodo, addTodo, deleteSelected, updateList } from "../service/api";

const initialState = {
  data: [],
  isLoading: false,
  success: false,
  error: null,
};

const getListSlice = createSlice({
  name: "getlists",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLists.fulfilled, (state, action) => {
        const newItems = action.payload.filter(
          (newItem) => !state.data.some((item) => item._id === newItem._id)
        );
        state.data = [...state.data, ...newItems];
        state.success = true;
        state.isLoading = false;
      })
      .addCase(getAllLists.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      
  },
});

export default getListSlice.reducer;
