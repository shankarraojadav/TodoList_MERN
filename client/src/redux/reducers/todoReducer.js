import {
  ADD_TODO_FAILURE,
  ADD_TODO_SUCCESS,
  ADD_TODO_REQUEST,
  GET_ALL_TODOS_SUCCESS,
  GET_ALL_TODOS_FAILURE,
  GET_ALL_TODOS_REQUEST,
  MARK_COMPLETED_REQUEST,
  MARK_COMPLETED_SUCCESS,
  MARK_COMPLETED_FAILURE,
  DELETE_MULTIPLE_REQUEST,
  DELETE_MULTIPLE_FAILURE,
  DELETE_MULTIPLE_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  GET_TODO_BYID_REQUEST,
  GET_TODO_BYID_SUCCESS,
  GET_TODO_BYID_FAILURE
} from "../actions/type";

export const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return { loading: true };
    case ADD_TODO_SUCCESS:
      return { loading: false, success: true, addData: action.payload };
    case ADD_TODO_FAILURE:
      return { loading: false, error: action.payload.error };
    // case ADD_TODO_RESET:
    //   return {};
    default:
      return state;
  }
};


export const getAllTodos = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TODOS_REQUEST:
      return { loading: true };
    case GET_ALL_TODOS_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_ALL_TODOS_FAILURE:
      return { loading: false, error: action.payload.error };
    // case ADD_TODO_RESET:
    //   return {};
    default:
      return state;
  }
};


export const markCompletedTask = (state = {}, action) => {
  switch (action.type) {
    case MARK_COMPLETED_REQUEST:
      return { loading: true };
    case MARK_COMPLETED_SUCCESS:
      return { loading: false, success: true, markData: action.payload };
    case MARK_COMPLETED_FAILURE:
      return { loading: false, error: action.payload.error };
    // case ADD_TODO_RESET:
    //   return {};
    default:
      return state;
  }
};


export const deleteMultipleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MULTIPLE_REQUEST:
      return { loading: true };
    case DELETE_MULTIPLE_SUCCESS:
      return { loading: false, success: true, deleteData: action.payload };
    case DELETE_MULTIPLE_FAILURE:
      return { loading: false, error: action.payload.error };
    // case ADD_TODO_RESET:
    //   return {};
    default:
      return state;
  }
};




export const updateTodoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TODO_REQUEST:
      return { loading: true };
    case UPDATE_TODO_SUCCESS:
      return { loading: false, success: true, updateData: action.payload };
    case UPDATE_TODO_FAILURE:
      return { loading: false, error: action.payload.error };
    // case ADD_TODO_RESET:
    //   return {};
    default:
      return state;
  }
};


export const getTodoByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TODO_BYID_REQUEST:
      return { loading: true };
    case GET_TODO_BYID_SUCCESS:
      return { loading: false, success: true, toDoByIdData: action.payload };
    case GET_TODO_BYID_FAILURE:
      return { loading: false, error: action.payload.error };
    // case ADD_TODO_RESET:
    //   return {};
    default:
      return state;
  }
};
