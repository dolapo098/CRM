import { status, state } from "../_helper/index.mjs";

//Design to alter the behaviour of the workflow contexts  based on status and state keys
export class ComplaintsWorkFlow {
  constructor() {
    this.currentState = new ClientEngagementOfficer(this);
  }

  change(state, params) {
    this.currentState = state;
    this.currentState.approve(params);
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
    params.state === state.approvedByClientEngagementOfficer &&
    params.status === status.awaitingClientEngagementOfficer
  ) {
    params.status = status.awaitngFoodProcessingOfficer;
    return params;
  }
  this._complaintsRequest.change(
    new FoodProcessingOfficer(this._complaintsRequest),
    params
  );
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
    params.state === state.approvedByFoodProcessingOfficer &&
    params.status === status.awaitngFoodProcessingOfficer
  ) {
    params.status = status.awaitingFoodTaster;
    return params;
  }
  this._complaintsRequest.change(
    new FoodTaster(this._complaintsRequest),
    params
  );
};

//reject behavioural pattern
FoodProcessingOfficer.prototype.reject = function (params) {
  if (
    params.state === state.rejectedByFoodProcessingOfficer &&
    params.status === status.awaitngFoodProcessingOfficer
  ) {
    params.status = status.awaitingClientEngagementOfficer;
    return params;
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
    params.status === status.awaitingFoodTaster
  ) {
    console.log(" i entred food  taster");
    params.status = status.complete;
    params.closedBy = params.reviewedBy;
    params.dateClosed = new Date().toISOString();
  }
  return params;
};

//reject behavioural pattern
FoodTaster.prototype.reject = function (params) {
  if (
    params.state === state.rejectedByFoodTaster &&
    params.status === status.awaitingFoodTaster
  ) {
    params.status = status.awaitngFoodProcessingOfficer;
  }
  return params;
};
