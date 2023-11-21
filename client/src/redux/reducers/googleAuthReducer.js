import {
  SIGNIN_REQUEST,
  GOOGLE_SIGNIN_SUCCESS,
  GOOGLE_SIGNIN_FAILURE,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE
} from "../actions/type";


export const googleAuth = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return { loading: true };
    case GOOGLE_SIGNIN_SUCCESS:
      return {
        loading: false,
        success: true,
        isLoggedIn: true,
        userData: action.payload,
      };
    case GOOGLE_SIGNIN_FAILURE:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const verifyTokenAAuth = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_TOKEN_REQUEST:
      return { loading: true };
    case VERIFY_TOKEN_SUCCESS:
      return {
        loading: false,
        success: true,
        isLoggedIn: true,
        userData: action.payload,
      };
    case VERIFY_TOKEN_FAILURE:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};



