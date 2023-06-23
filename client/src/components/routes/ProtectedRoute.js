import React from "react";
import { useCookies } from "react-cookie";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies(["userToken"]);
  const isAuthenticated = !!cookies.userToken; // Check if the user token cookie exists

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
