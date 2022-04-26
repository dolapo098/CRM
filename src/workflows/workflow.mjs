import { last_action, state } from "../_helper/index.mjs";

//Design to alter the behaviour of the workflow contexts  based on status and state keys
export class ComplaintsWorkFlow {
  constructor() {
    this.currentState = new ClientEngagementOfficer(this);
  }

  change(state, params) {
    this.currentState = state;
    this.currentState.approve(params);
    this.currentState.reject(params);
  }

  manageRequest(params) {
    this.currentState.approve(params);
    this.currentState.reject(params);
    return params;
  }
}

//Client Enagagement state
class ClientEngagementOfficer {
  constructor(complaintsRequest) {
    this._complaintsRequest = complaintsRequest;
  }
}

//approve behavioural pattern
ClientEngagementOfficer.prototype.approve = function (params) {
  if (
    (params.state === state.awaitngFoodProcessingOfficer &&
      params.last_action === last_action.complaints_initiated) ||
    (params.state === state.awaitngFoodProcessingOfficer &&
      params.last_action === last_action.rejectedByFoodProcessingOfficer)
  ) {
    params.last_action = last_action.approvedByClientEngagementOfficer;
  }
  return params;
  // this._complaintsRequest.change(
  //   new FoodProcessingOfficer(this._complaintsRequest),
  //   params
  // );
};

//reject behavioural pattern
ClientEngagementOfficer.prototype.reject = function (params) {
  this._complaintsRequest.change(
    new FoodProcessingOfficer(this._complaintsRequest),
    params
  );
};

//Food processing officer  state
class FoodProcessingOfficer {
  constructor(complaintsRequest) {
    this._complaintsRequest = complaintsRequest;
  }
}

//approve behavioural pattern
FoodProcessingOfficer.prototype.approve = function (params) {
  if (
    (params.state === state.awaitingFoodTaster &&
      params.last_action === last_action.approvedByClientEngagementOfficer) ||
    (params.state === state.awaitingFoodTaster &&
      params.last_action === last_action.rejectedByFoodTaster)
  ) {
    params.last_action = last_action.approvedByFoodProcessingOfficer;
  }
  return params;
  // this._complaintsRequest.change(
  //   new FoodTaster(this._complaintsRequest),
  //   params
  // );
};

//reject behavioural pattern
FoodProcessingOfficer.prototype.reject = function (params) {
  if (
    (params.state === state.awaitingClientEngagementOfficer &&
      params.last_action === last_action.approvedByClientEngagementOfficer) ||
    (params.state === state.awaitingFoodTaster &&
      params.last_action === last_action.rejectedByFoodTaster)
  ) {
    params.last_action = last_action.rejectedByFoodProcessingOfficer;
    // return params;
  }
  this._complaintsRequest.change(
    new FoodTaster(this._complaintsRequest),
    params
  );
};

//Food taster state
class FoodTaster {
  constructor(complaintsRequest) {
    this._complaintsRequest = complaintsRequest;
  }
}

//approve behavioural pattern
FoodTaster.prototype.approve = function (params) {
  if (
    params.state === state.complete &&
    params.last_action === last_action.approvedByFoodProcessingOfficer
  ) {
    params.last_action = last_action.approvedByFoodTaster;
    params.closedBy = params.last_reviewed_by;
    params.dateClosed = new Date().toISOString();
  }
  return params;
};

//reject behavioural pattern
FoodTaster.prototype.reject = function (params) {
  if (
    params.state === state.awaitngFoodProcessingOfficer &&
    params.last_action === last_action.approvedByFoodProcessingOfficer
  ) {
    params.last_action = last_action.rejectedByFoodTaster;
  }
  return params;
};
