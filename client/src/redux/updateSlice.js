import { createSlice } from "@reduxjs/toolkit";
import { updateTodo } from "../service/api";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const updateTodoSlice = createSlice({
  name: "updateTodos",
  initialState,
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default updateTodoSlice.reducer;
