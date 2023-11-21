import axios from "axios";

import {
  DELETE_MULTIPLE,
  DELETE_MULTIPLE_FAILURE,
  DELETE_MULTIPLE_SUCCESS,
  GET_ALL_TODOS_SUCCESS
} from "./type";

const url = "http://localhost:3000";
// "https://todolist-9ig6.onrender.com" ||

const token = localStorage.getItem("jwt");

export const deleteMultiple =
  (selectAll) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_MULTIPLE});

     const response = await axios.delete(`${url}/deleteSelected`, {
        data: { selectAll }, 
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
        },
      });

      dispatch({ type: GET_ALL_TODOS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: DELETE_MULTIPLE_FAILURE, payload: error.response.data });
    }
  };
