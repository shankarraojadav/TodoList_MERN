import axios from "axios";

import {
  DELETE_MULTIPLE,
  DELETE_MULTIPLE_FAILURE,
  GET_ALL_TODOS_SUCCESS,
} from "./type";

const url = "https://todolist-9ig6.onrender.com" || "http://localhost:3000";

export const deleteMultiple = (selectedItems) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  try {
    dispatch({ type: DELETE_MULTIPLE });

    const response = await axios.delete(`${url}/deleteSelected`, {
      data: { selectedItems },
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
