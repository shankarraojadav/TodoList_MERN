import {
  ADD_TODO_FAILURE,
  ADD_TODO_SUCCESS,
  ADD_TODO_REQUEST,
  GET_ALL_TODOS_SUCCESS,
  GET_ALL_TODOS_FAILURE,
  GET_ALL_TODOS,
  MARK_COMPLETED,
  MARK_COMPLETED_SUCCESS,
  MARK_COMPLETED_FAILURE,
  DELETE_MULTIPLE,
  DELETE_MULTIPLE_FAILURE,
  DELETE_MULTIPLE_SUCCESS,
  DELETE_ONE,
  DELETE_ONE_SUCCESS,
  DELETE_ONE_FAILURE,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
} from "../actions/type";

export const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return { loading: true };
    case ADD_TODO_SUCCESS:
      return { loading: false, success: true, data: action.payload };
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
    case GET_ALL_TODOS:
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
    case MARK_COMPLETED:
      return { loading: true };
    case MARK_COMPLETED_SUCCESS:
      return { loading: false, success: true, data: action.payload };
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
    case DELETE_MULTIPLE:
      return { loading: true };
    case DELETE_MULTIPLE_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case DELETE_MULTIPLE_FAILURE:
      return { loading: false, error: action.payload.error };
    // case ADD_TODO_RESET:
    //   return {};
    default:
      return state;
  }
};

export const deleteOneReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ONE:
      return { loading: true };

    case DELETE_ONE_SUCCESS: {
      const updatedData = state.data.filter(
        (item) => item._id !== action.payload.id
      );

      return {
        loading: false,
        success: true,
        data: updatedData, 
      };
    }

    case DELETE_ONE_FAILURE:
      return { loading: false, error: action.payload.error };

    // case ADD_TODO_RESET:
    //   return {};

    default:
      return state;
  }
};


export const updateTodoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TODO:
      return { loading: true };
    case UPDATE_TODO_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case UPDATE_TODO_FAILURE:
      return { loading: false, error: action.payload.error };
    // case ADD_TODO_RESET:
    //   return {};
    default:
      return state;
  }
};
