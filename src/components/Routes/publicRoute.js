// these section is route section and it is ublic route. Like , Signup page or signup page in this Section.
import React from "react";
import { Route, Redirect } from "react-router-dom";
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
  
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("sessiontree") ? (
          <Redirect to="/homepage" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
