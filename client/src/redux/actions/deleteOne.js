import axios from "axios";

import {
  DELETE_ONE,
  DELETE_ONE_FAILURE,
  DELETE_MULTIPLE_SUCCESS,
  DELETE_ONE_SUCCESS,
  GET_ALL_TODOS_SUCCESS
} from "./type";

const url = "http://localhost:3000";
// "https://todolist-9ig6.onrender.com" ||

const token = localStorage.getItem("jwt");

export const deleteOne = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ONE });

     const response = await axios.delete(`${url}/deleteOne`, {
        data: { id },
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
        },
      });

    dispatch({ type: GET_ALL_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_ONE_FAILURE, payload: error.response.data });
  }
};
