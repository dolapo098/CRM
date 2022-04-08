import { status, state, roles } from "../_helper/index.mjs";
export class ComplaintsWorkFlow {
  constructor() {
    this.currentState = new ClientEngagementOfficer(this);
  }

  change(state, params) {
    this.currentState = state;
    this.currentState.approve(params);
  }

  manageRequest(params) {
    let newParams;
    newParams = this.currentState.approve(params);
    newParams = this.currentState.reject(params);
    return newParams;
  }
}

class ClientEngagementOfficer {
  constructor(complaintsRequest) {
    this._complaintsRequest = complaintsRequest;
  }
}

ClientEngagementOfficer.prototype.approve = function (params) {
  if (
    params.state === state.approvedByClientEngagementOfficer &&
    params.status === status.awaitingClientEngagementOfficer
  ) {
    params.status = status.awaitngFoodProcessingOfficer;
    this._complaintsRequest.change(
      new FoodProcessingOfficer(this._complaintsRequest),
      params
    );
    return params;
  }
};

ClientEngagementOfficer.prototype.reject = function (params) {
  return params;
};

class FoodProcessingOfficer {
  constructor(complaintsRequest) {
    this._complaintsRequest = complaintsRequest;
  }
}
FoodProcessingOfficer.prototype.approve = function (params) {
  if (
    params.state === state.approvedByFoodProcessingOfficer &&
    params.status === status.awaitngFoodProcessingOfficer
  ) {
    params.status = status.awaitingFoodTaster;
    this._complaintsRequest.change(
      new FoodTaster(this._complaintsRequest),
      params
    );
  }
  return params;
};

FoodProcessingOfficer.prototype.reject = function (params) {
  if (
    params.state === state.rejectedByFoodProcessingOfficer &&
    params.status === status.awaitngFoodProcessingOfficer
  ) {
    params.status = status.awaitingClientEngagementOfficer;
    this._complaintsRequest.change(
      new FoodTaster(this._complaintsRequest),
      params
    );
  }
  return params;
};

class FoodTaster {
  constructor(complaintsRequest) {
    this._complaintsRequest = complaintsRequest;
  }
}

FoodTaster.prototype.approve = function (params) {
  if (
    params.status === state.complete &&
    params.status === status.awaitingFoodTaster
  ) {
    params.status = status.complete;
    params.closedBy = params.reviewedBy;
    params.dateClosed = new Date();
  }
  return params;
};

FoodTaster.prototype.reject = function (params) {
  if (
    params.state === state.rejectedByFoodTaster &&
    params.status === status.awaitingFoodTaster
  ) {
    params.status = status.awaitngFoodProcessingOfficer;
    this._complaintsRequest.change(
      new FoodProcessingOfficer(this._complaintsRequest),
      params
    );
  }
  return params;
};
