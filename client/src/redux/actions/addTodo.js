import axios from "axios";

import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE, GET_ALL_TODOS_SUCCESS } from "./type";

const url = "https://todolist-9ig6.onrender.com" || "http://localhost:3000";


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


    dispatch({ type: GET_ALL_TODOS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error)
    dispatch({ type: ADD_TODO_FAILURE, payload: error.response.data });
  }
};
