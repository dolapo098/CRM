class ComplaintsWorkFlow {
  constructor(currentState) {
    this.currentState = currentState;
  }
}

ComplaintsWorkFlow.prototype.manageRequest = function () {
  this.currentState.handleRequest();
};
