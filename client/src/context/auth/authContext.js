import React, { createContext, useReducer } from "react";
import userReducer from "./authReducer";
import axios from "axios";

export const AuthContext = createContext();

const initialState = {
  loggedInUser: null,
  users: null,
  user: null,
  error: null,
  message: null,
  token: null,
  isAuthenticated: false,
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Register user
  const register = async (user) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users", user, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data.message,
      });
    } catch (err) {
      dispatch({ type: "REGISTER_FAIL", payload: err.response.data.error });
    }
  };

  // Login user
  const login = async (user) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth", user, {
        headers: { "Content-Type": "application/json" },
      });
      // console.log(res.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: "LOGIN_FAIL", payload: err.response.data.error });
    }
  };

  // Load User
  const loadUser = async () => {
    // setAuthToken(localStorage.token);

    try {
      const res = await axios.get("http://localhost:5000/api/auth", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      dispatch({
        type: "LOAD_USER",
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: "AUTH_FAIL" });
    }
  };

  // Logout
  const logout = () => dispatch({ type: "LOGOUT" });

  // Delete user
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch({ type: "DELETE_USER", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser: state.loggedInUser,
        users: state.users,
        user: state.user,
        error: state.error,
        message: state.message,
        isAuthenticated: state.isAuthenticated,
        register,
        login,
        loadUser,
        logout,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
