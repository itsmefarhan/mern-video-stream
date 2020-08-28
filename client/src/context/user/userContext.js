import React, { createContext, useReducer } from "react";
import userReducer from "./userReducer";
import axios from "axios";

export const UserContext = createContext();

const initialState = {
  users: null,
  user: null,
  error: null,
  message: null,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      // console.log(res.data);
      dispatch({ type: "GET_USERS", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // Get user by id
  const getUser = async (id) => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      dispatch({ type: "GET_USER", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // Update user
  const updateUser = async (id, user) => {
    try {
      const res = await axios.put(`/api/users/${id}`, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch({ type: "UPDATE_USER", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: err.response.data.message });
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        user: state.user,
        error: state.error,
        message: state.message,
        getUsers,
        getUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
