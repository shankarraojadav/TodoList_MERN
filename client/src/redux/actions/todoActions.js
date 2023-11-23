import axios from "axios";

import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  GET_ALL_TODOS_REQUEST,
  GET_ALL_TODOS_SUCCESS,
  GET_ALL_TODOS_FAILURE,
  MARK_COMPLETED_REQUEST,
  MARK_COMPLETED_SUCCESS,
  MARK_COMPLETED_FAILURE,
  DELETE_MULTIPLE_REQUEST,
  DELETE_MULTIPLE_SUCCESS,
  DELETE_MULTIPLE_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  GET_TODO_BYID_REQUEST,
  GET_TODO_BYID_SUCCESS,
  GET_TODO_BYID_FAILURE,
} from "./type";

const url = "https://todolist-9ig6.onrender.com" || "http://localhost:3000";


export const addTodoList = (title) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    dispatch({ type: ADD_TODO_REQUEST });

    const { data } = await axios.post(
      `${url}/addTodo`,
      { title },
      {
        headers: {
          Authorization: "Bearer" + token,
          Accept: "application/json",
        },
      }
    );

    dispatch({ type: ADD_TODO_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_TODO_FAILURE, payload: error.response.data });
  }
};

// GET All Todos

export const getAllTodoList = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    dispatch({ type: GET_ALL_TODOS_REQUEST });

    const response = await axios.get(
      `${url}/getAllLists`,

      {
        headers: {
          Authorization: "Bearer" + token,
          Accept: "application/json",
        },
      }
    );

    console.log(response);

    dispatch({ type: GET_ALL_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_TODOS_FAILURE, payload: error.response.data });
  }
};

// Mark Completed Todo

export const markCompleted =
  ({ ids, completed }) =>
  async (dispatch) => {
    const token = localStorage.getItem("jwt");
    try {
      console.log({ ids, completed });
      dispatch({ type: MARK_COMPLETED_REQUEST });

      const response = await axios.put(
        `${url}/updateCompleted`,
        { ids, completed },
        {
          headers: {
            authorization: "Bearer" + token,
            Accept: "application/json",
          },
        }
      );

      dispatch({ type: MARK_COMPLETED_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: MARK_COMPLETED_FAILURE, payload: error.response.data });
    }
  };

// Update Todos

export const updateTodo = (data) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  try {
    dispatch({ type: UPDATE_TODO_REQUEST });

    const response = await axios.put(`${url}/updatetodo`, data, {
      headers: {
        authorization: "Bearer" + token,
        Accept: "application/json",
      },
    });

    dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_TODO_FAILURE, payload: error.response.data });
  }
};

// Delete Action

export const deleteMultiple = (selectedItems) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  try {
    dispatch({ type: DELETE_MULTIPLE_REQUEST });

    const response = await axios.delete(`${url}/deleteSelected`, {
      data: { selectedItems },
      headers: {
        authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });

    dispatch({ type: DELETE_MULTIPLE_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_MULTIPLE_FAILURE, payload: error.response.data });
  }
};

// get data by id

export const getTodoById = (id) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  try {
    console.log(id);
    dispatch({ type: GET_TODO_BYID_REQUEST });

    const response = await axios.get(`${url}/getTodoById/${id}`, {
      headers: {
        authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });

    dispatch({ type: GET_TODO_BYID_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_TODO_BYID_FAILURE, payload: error.response.data });
  }
};
