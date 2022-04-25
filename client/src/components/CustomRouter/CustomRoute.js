import React from "react";
import { PrivateRoute } from "../ProtectedRoute";
import {
  Initiator,
  ClientEngagementOfficer,
  FoodProcessingOfficer,
  FoodTaster,
  CompletedRequests,
} from "../ManageRequest";
import { Home } from "../HomePage";
import { roles } from "../../_helper";

export function CustomRoute() {
  return (
    <React.Fragment>
      <PrivateRoute
        exact
        path='/'
        roles={[
          roles.client,
          roles.client_engagement_officer,
          roles.food_processing_officer,
        ]}
        component={Home}
      ></PrivateRoute>
      <PrivateRoute
        path='/initiator'
        roles={[roles.client]}
        component={Initiator}
      ></PrivateRoute>

      <PrivateRoute
        path='/clientengagementofficer'
        roles={[roles.client_engagement_officer]}
        component={ClientEngagementOfficer}
      ></PrivateRoute>
      <PrivateRoute
        path='/completedrequests'
        roles={[
          roles.client_engagement_officer,
          roles.client,
          roles.food_taster,
          roles.food_processing_officer,
        ]}
        component={CompletedRequests}
      ></PrivateRoute>
      <PrivateRoute
        path='/foodprocessingofficer'
        roles={[roles.food_processing_officer]}
        component={FoodProcessingOfficer}
      ></PrivateRoute>
      <PrivateRoute
        path='/foodtaster'
        roles={[roles.food_taster]}
        component={FoodTaster}
      ></PrivateRoute>
    </React.Fragment>
  );
}
