import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthContextProvider from "./context/auth/authContext";
import UserContextProvider from "./context/user/userContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import PrivateRoute from "./components/PrivateRoute";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Menu />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/user/:id" component={Profile} />
            <Route exact path="/user/edit/:id" component={EditProfile} />
          </Switch>
        </BrowserRouter>
      </UserContextProvider>
    </AuthContextProvider>
  );
};

export default App;
