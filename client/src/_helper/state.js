const status = {
  awaitingClientEngagementOfficer: 1,
  awaitngFoodProcessingOfficer: 2,
  awaitingFoodTaster: 3,
  complete: 4,
};

const state = {
  initiateRequest: "complaints_initiated",
  approvedByClientEngagementOfficer: "approved_clientengagement_officer",
  approvedByFoodProcessingOfficer: "approved_food_processing_officer",
  rejectedByFoodProcessingOfficer: "rejected_food_processing_officer",
  complete: "complete",
  rejectedByFoodTaster: "rejected_food_taster",
};

export const appStateData = {
  state,
  status,
};
