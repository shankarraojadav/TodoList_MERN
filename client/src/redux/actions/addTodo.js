import axios from "axios";

import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE } from "./type";

const url = "http://localhost:3000";
// "https://todolist-9ig6.onrender.com" ||

const token = localStorage.getItem("jwt");

export const addTodo = (title) => async (dispatch, getState) => {
  try {
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
    console.log(error)
    dispatch({ type: ADD_TODO_FAILURE, payload: error.response.data });
  }
};