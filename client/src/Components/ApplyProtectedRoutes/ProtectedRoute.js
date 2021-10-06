import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(passPath) => {
        if (auth.isAuthenticated()) {
          return <Component {...passPath} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: passPath.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
