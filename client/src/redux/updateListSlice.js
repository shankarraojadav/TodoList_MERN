import { createSlice } from "@reduxjs/toolkit";
import { addTodo } from "../service/api";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const addTodoSlice = createSlice({
  name: "addTodos",
  initialState,
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default addTodoSlice.reducer;
