import axios from "axios";

import {
  MARK_COMPLETED,
  MARK_COMPLETED_FAILURE,
  GET_ALL_TODOS_SUCCESS,
} from "./type";

const url = "https://todolist-9ig6.onrender.com" || "http://localhost:3000";

export const markCompleted =
  ({ ids, completed }) =>
  async (dispatch) => {
    const token = localStorage.getItem("jwt");
    try {
      console.log({ ids, completed });
      dispatch({ type: MARK_COMPLETED });

      const response = await axios.put(
        `${url}/updateCompleted`,
        { ids, completed },
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
      dispatch({ type: MARK_COMPLETED_FAILURE, payload: error.response.data });
    }
  };
