import { createSlice } from "@reduxjs/toolkit";
import { deleteOne, getAllLists, updateTodo, addTodo, deleteSelected } from "../service/api";

const initialState = {
  data: [],
  isLoading: false,
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
        state.isLoading = false;
      })
      .addCase(getAllLists.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
       .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const updatedIndex = state.data.findIndex(
          (item) => item._id === updatedTodo._id
        );

        if (updatedIndex !== -1) {
          state.data[updatedIndex] = updatedTodo;
        } else {
          state.data.push(updatedTodo);
        }

        state.isLoading = false;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteOne.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteSelected.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSelected.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteSelected.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  },
});

export default getListSlice.reducer;
