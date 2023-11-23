import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { addItemReducer, getAllTodos, markCompletedTask,
deleteMultipleReducer, updateTodoReducer, getTodoByIdReducer } from "./reducers/todoReducer";
import { googleAuth, verifyTokenAAuth } from "./reducers/googleAuthReducer";


const rootReducer = combineReducers({
  addTodo: addItemReducer,
  signin: googleAuth,
  tokenVerified:verifyTokenAAuth,
  AllTodos: getAllTodos,
  markComplete: markCompletedTask,
  DeleteMultiple: deleteMultipleReducer,
  UpdateTodo: updateTodoReducer,
  getTodoById: getTodoByIdReducer,
})

const store = configureStore({
  reducer: rootReducer
});



export default store;