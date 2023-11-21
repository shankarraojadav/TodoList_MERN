import axios from "axios";

import { 
  GET_ALL_TODOS_SUCCESS,
    UPDATE_TODO,
    UPDATE_TODO_FAILURE,
    UPDATE_TODO_SUCCESS
 } from "./type";

const url = "https://todolist-9ig6.onrender.com" || "http://localhost:3000";


const token = localStorage.getItem("jwt");

export const updateTodo = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_TODO });

      const response = await axios.put(
        `${url}/updatetodo`,
        data,
        {
          headers: {
            authorization: "Bearer" + token,
            Accept: "application/json",
          },
        }
      );

    dispatch({ type: GET_ALL_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_TODO_FAILURE, payload: error.response.data });
  }
};
