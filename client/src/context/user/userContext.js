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

  const sub = async (userId, subId) => {
    try {
      const res = await axios.put(
        "/api/users/subscribe",
        { userId, subId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: "SUB", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const unsub = async (userId, unsubId) => {
    try {
      const res = await axios.put(
        "/api/users/unsubscribe",
        { userId, unsubId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: "UNSUB", payload: res.data });
    } catch (err) {
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
        sub,
        unsub,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
