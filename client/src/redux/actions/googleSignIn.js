import axios from "axios";

import {
  SIGNIN_REQUEST,
  GOOGLE_SIGNIN_SUCCESS,
  GOOGLE_SIGNIN_FAILURE,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_FAILURE,
} from "./type";

const url = "http://localhost:3000";
// "https://todolist-9ig6.onrender.com" || 
export const googleSignIn = (userData) => async (dispatch) => {
  try {
    console.log("acton");
    dispatch({ type: SIGNIN_REQUEST });

    const response = await axios.post(`${url}/signin`, userData);
    // console.log(data);
    dispatch({ type: GOOGLE_SIGNIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GOOGLE_SIGNIN_FAILURE, payload: error.response.data });
  }
};

export const verifyToken = (token) => async (dispatch) => {
  try {
  
    dispatch({ type: VERIFY_TOKEN_REQUEST });

    const response = await axios.post(`${url}/verifyToken`,{}, {
      headers: {
        Authorization: "Bearer" + token,
        Accept: "application/json",
      },
    });

    dispatch({ type: GOOGLE_SIGNIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("verifyerrror", error);
    dispatch({ type: VERIFY_TOKEN_FAILURE, payload: error.response.data });
  }
};
