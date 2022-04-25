import { appStateData } from "../_helper";

//classes used to render a specific modal based on the status of the work flow
export class CompleteStatusData {
  constructor(val, func) {
    this.val = val;
    this.func = func;
  }

  //To view request status for client
  showTableData() {
    if (this.val === appStateData.state.complete) {
      this.func("Our dispatch will deliver the food shortly");
    }
  }
}

export class ClientOfficerStatusData {
  constructor(val, func) {
    this.val = val;
    this.func = func;
  }

  //To view request status fot client
  showTableData() {
    if (this.val === appStateData.state.awaitingClientEngagementOfficer) {
      this.func("Request has been confirmed");
    }
  }
}

export class FoodOfficerStatusData {
  constructor(val, func) {
    this.val = val;
    this.func = func;
  }

  //To view request status for client
  showTableData() {
    if (this.val === appStateData.state.awaitngFoodProcessingOfficer) {
      this.func("The food packaging is presently receiving attention");
    }
  }
}

export class FoodTasterStatusData {
  constructor(val, func) {
    this.val = val;
    this.func = func;
  }

  //To view request status for client
  showTableData() {
    if (this.val === appStateData.state.awaitingFoodTaster) {
      this.func("The food packaging is presently receiving attention");
    }
  }
}
