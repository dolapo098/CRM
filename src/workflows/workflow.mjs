import { last_action, state } from "../_helper/index.mjs";

//Design to alter the behaviour of the workflow contexts  based on status and state keys
export class ComplaintsWorkFlow {
  constructor() {
    this.currentState = new ClientEngagementOfficer(this);
    this.count = 0;
  }

  change(state, params) {
    this.count += 1;
    this.currentState = state;
    this.currentState.manageRequest(params, this.count);
    // this.currentState.reject(params);
  }

  manageRequest(params, count = 0) {
    this.currentState.manageRequest(params, (this.count = count));

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
ClientEngagementOfficer.prototype.manageRequest = function (params, count) {
  if (count >= 3) return params;
  if (
    (params.state === state.awaitngFoodProcessingOfficer &&
      params.last_action === last_action.complaints_initiated) ||
    (params.state === state.awaitngFoodProcessingOfficer &&
      params.last_action === last_action.rejectedByFoodProcessingOfficer)
  ) {
    params.last_action = last_action.approvedByClientEngagementOfficer;
  }
  this._complaintsRequest.change(
    new FoodProcessingOfficer(this._complaintsRequest),
    params
  );
};

//reject behavioural pattern
// ClientEngagementOfficer.prototype.reject = function (params) {
//   this._complaintsRequest.change(
//     new FoodProcessingOfficer(this._complaintsRequest),
//     params
//   );
// };

//Food processing officer  state
class FoodProcessingOfficer {
  constructor(complaintsRequest) {
    this._complaintsRequest = complaintsRequest;
  }
}

//approve behavioural pattern
FoodProcessingOfficer.prototype.manageRequest = function (params, count) {
  if (count >= 3) return params;
  if (
    (params.state === state.awaitingFoodTaster &&
      params.last_action === last_action.approvedByClientEngagementOfficer) ||
    (params.state === state.awaitingFoodTaster &&
      params.last_action === last_action.rejectedByFoodTaster)
  ) {
    params.last_action = last_action.approvedByFoodProcessingOfficer;
  } else if (
    (params.state === state.awaitingClientEngagementOfficer &&
      params.last_action === last_action.approvedByClientEngagementOfficer) ||
    (params.state === state.awaitingClientEngagementOfficer &&
      params.last_action === last_action.rejectedByFoodTaster)
  ) {
    params.last_action = last_action.rejectedByFoodProcessingOfficer;
  }
  this._complaintsRequest.change(
    new FoodTaster(this._complaintsRequest),
    params
  );
};

//reject behavioural pattern
// FoodProcessingOfficer.prototype.reject = function (params) {
//   if (
//     (params.state === state.awaitingClientEngagementOfficer &&
//       params.last_action === last_action.approvedByClientEngagementOfficer) ||
//     (params.state === state.awaitingClientEngagementOfficer &&
//       params.last_action === last_action.rejectedByFoodTaster)
//   ) {
//     console.log(" food processing officer 2");
//     params.last_action = last_action.rejectedByFoodProcessingOfficer;
//     // return params;
//   }
//   this._complaintsRequest.change(
//     new FoodTaster(this._complaintsRequest),
//     params
//   );
// };

//Food taster state
class FoodTaster {
  constructor(complaintsRequest) {
    this._complaintsRequest = complaintsRequest;
  }
}

//approve behavioural pattern
FoodTaster.prototype.manageRequest = function (params, count) {
  if (count >= 3) return params;
  if (
    params.state === state.complete &&
    params.last_action === last_action.approvedByFoodProcessingOfficer
  ) {
    params.last_action = last_action.approvedByFoodTaster;
    params.closedBy = params.last_reviewed_by;
    // params.dateClosed = new Date().toISOString();
    params.dateClosed = Math.floor(Date.now() / 1000);
  } else if (
    params.state === state.awaitngFoodProcessingOfficer &&
    params.last_action === last_action.approvedByFoodProcessingOfficer
  ) {
    params.last_action = last_action.rejectedByFoodTaster;
  }
  this._complaintsRequest.change(
    new ClientEngagementOfficer(this._complaintsRequest),
    params
  );
  // return params;
};

//reject behavioural pattern
// FoodTaster.prototype.reject = function (params) {
//   if (
//     params.state === state.awaitngFoodProcessingOfficer &&
//     params.last_action === last_action.approvedByFoodProcessingOfficer
//   ) {
//     console.log(" food taster 2");
//     params.last_action = last_action.rejectedByFoodTaster;
//   }
//   this._complaintsRequest.change(new this._complaintsRequest(), params);
//   // return params;
// };
