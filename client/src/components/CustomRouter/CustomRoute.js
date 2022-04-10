import React from "react";
import { PrivateRoute } from "../ProtectedRoute";
import {
  Initiator,
  ClientEngagementOfficer,
  FoodProcessingOfficer,
  FoodTaster,
} from "../ManageRequest";
import { Home } from "../HomePage";

export function CustomRoute() {
  return (
    <React.Fragment>
      <PrivateRoute path='/' component={Home}></PrivateRoute>
      <PrivateRoute path='/initiator' component={Initiator}></PrivateRoute>;
      <PrivateRoute
        path='/clientengamentofficer'
        component={ClientEngagementOfficer}
      ></PrivateRoute>
      <PrivateRoute
        path='/foodprocessingofficer'
        component={FoodProcessingOfficer}
      ></PrivateRoute>
      <PrivateRoute path='/foodtaster' component={FoodTaster}></PrivateRoute>;
    </React.Fragment>
  );
}
