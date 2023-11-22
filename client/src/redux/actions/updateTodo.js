import axios from "axios";

import {
  GET_ALL_TODOS_SUCCESS,
  UPDATE_TODO,
  UPDATE_TODO_FAILURE,
} from "./type";

const url = "https://todolist-9ig6.onrender.com" || "http://localhost:3000";

export const updateTodo = (data) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  try {
    dispatch({ type: UPDATE_TODO });

    const response = await axios.put(`${url}/updatetodo`, data, {
      headers: {
        authorization: "Bearer" + token,
        Accept: "application/json",
      },
    });

    dispatch({ type: GET_ALL_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_TODO_FAILURE, payload: error.response.data });
  }
};
