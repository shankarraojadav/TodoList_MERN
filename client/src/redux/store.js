import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import getListsReducer from "./getAllSlice";
import addtodoReducer from "./addtodSlice";
import updateTodoReducer from "./updateSlice";
import deleteOneReducer from "./deleteOneSlice";
import deleteSelectedReducer from "./deleteSelectedSlice";
import updateListReducer from "./updateListSlice";

const reducer = combineReducers({
  login: AuthReducer,
  addTodo: addtodoReducer,
  allLists: getListsReducer,
  updateTodo: updateTodoReducer,
  deleteOne: deleteOneReducer,
  deleteSelected: deleteSelectedReducer,
  updateList: updateListReducer,
});

export const store = configureStore({
  reducer,
});
