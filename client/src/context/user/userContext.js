import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      // console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get user by id
  const getUser = async (id) => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      setUser(res.data);
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
      setMessage(res.data);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        error,
        message,
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
