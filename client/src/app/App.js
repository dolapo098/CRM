import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "../../src/shared";
import { CustomRoute } from "../components/CustomRouter";
import { Login } from "../components/LoginPage";

export function App() {
  return (
    <React.Fragment>
      <Header />

      <Switch>
        <Route exact path='/login' component={Login} />
        <CustomRoute />
      </Switch>
    </React.Fragment>
  );
}
