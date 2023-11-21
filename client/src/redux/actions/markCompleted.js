import axios from "axios";

import { 
    MARK_COMPLETED,
    MARK_COMPLETED_SUCCESS,
    MARK_COMPLETED_FAILURE
 } from "./type";

const url = "http://localhost:3000";
// "https://todolist-9ig6.onrender.com" ||

const token = localStorage.getItem("jwt");

export const markCompleted = ({ id, completed }) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_COMPLETED });

    const response = await axios.put(
        `${url}/updateCompleted`,
        { id, completed },
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