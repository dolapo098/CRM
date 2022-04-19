import React, { useState, useEffect } from "react";
import { Route, Router } from "react-router-dom";
import { history } from "../_helper";
// import { Header } from "../../src/shared";
import { CustomRoute } from "../components/CustomRouter";
import { Login } from "../components/LoginPage";
import { authenticationService } from "../_services";

export function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    let mounted = true;
    // subscribe for new current user when the event stream changes
    if (mounted) {
      authenticationService.currentUser.subscribe((x) => {
        setCurrentUser(x);
      });
    }
    mounted = false;
  }, []);

  return (
    <React.Fragment>
      {/* {currentUser && <Header />} */}
      <Router history={history}>
        <CustomRoute />
        <Route path='/login' component={Login} />
      </Router>
    </React.Fragment>
  );
}
