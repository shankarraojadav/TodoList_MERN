import axios from "axios";

import { 
    UPDATE_TODO,
    UPDATE_TODO_FAILURE,
    UPDATE_TODO_SUCCESS
 } from "./type";

const url = "http://localhost:3000";
// "https://todolist-9ig6.onrender.com" ||

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

    dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_TODO_FAILURE, payload: error.response.data });
  }
};
