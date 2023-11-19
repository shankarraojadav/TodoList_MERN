import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url =  "http://localhost:3000"; 
// "https://todolist-9ig6.onrender.com" ||

export const googleAuth = createAsyncThunk(
  "signin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/signin`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to sign in. Please try again.");
    }
  }
);

// api call to verify token

export const verifyToken = createAsyncThunk(
  "token",
  async (token, { rejectWithValue }) => {
    console.log("token", token);
    try {
      const response = await axios.post(
        `${url}/verifyToken`,
        {},
        {
          headers: {
            Authorization: "Bearer" + token,
            Accept: "application/json",
          },
        }
      );

      // console.log("response",response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Token verification failed. Please log in again.");
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(`${url}/addTodo`, data, {
        headers: {
          authorization: "Bearer" + token,
          Accept: "application/json",
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllLists = createAsyncThunk(
  "favourites",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("jwt");

    try {
      const response = await axios.get(`${url}/getAllLists`, {
        headers: {
          authorization: "Bearer" + token,
          Accept: "application/json",
        },
      });
      console.log("lists", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        "Failed to fetch fav data, please try after some time."
      );
    }
  }
);


// update todo

export const updateList = createAsyncThunk(
  "updateList",
  async (data, { rejectWithValue }) => {
    try {
  
      const token = localStorage.getItem("jwt");
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
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to update completed, please try after some time."
      );
    }
  }
);


// update completed or not

export const updateTodo = createAsyncThunk(
  "update",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      console.log(id, completed);
      const token = localStorage.getItem("jwt");
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
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to update completed, please try after some time."
      );
    }
  }
);

export const deleteSelected = createAsyncThunk(
  "delete/deleteSelected",
  async (selectAll, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.delete(`${url}/deleteSelected`, {
        data: { selectAll }, 
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to delete selected items, please try again later."
      );
    }
  }
);


export const deleteOne = createAsyncThunk(
  "delete/deleteOne",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.delete(`${url}/deleteOne`, {
        data: { id },
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        "Failed to delete selected items, please try again later."
      );
    }
  }
);