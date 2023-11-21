import axios from "axios";

import { 
    GET_ALL_TODOS,
    GET_ALL_TODOS_SUCCESS,
    GET_ALL_TODOS_FAILURE
 } from "./type";

const url = "https://todolist-9ig6.onrender.com" || "http://localhost:3000";



export const getAllTodoList = () => async (dispatch, getState) => {
  try {

    const token = localStorage.getItem("jwt");
    dispatch({ type: GET_ALL_TODOS });

    const response = await axios.get(
      `${url}/getAllLists`,

      {
        headers: {
          Authorization: "Bearer" + token,
          Accept: "application/json",
        },
      }
    );

    console.log(response)

    dispatch({ type: GET_ALL_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_TODOS_FAILURE, payload: error.response.data });
  }
};
