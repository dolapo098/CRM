// const status = {
//   awaitingClientEngagementOfficer: 1,
//   awaitngFoodProcessingOfficer: 2,
//   awaitingFoodTaster: 3,
//   complete: 4,
// };

// const state = {
//   initiateRequest: "complaints_initiated",
//   approvedByClientEngagementOfficer: "approved_clientengagement_officer",
//   approvedByFoodProcessingOfficer: "approved_food_processing_officer",
//   rejectedByFoodProcessingOfficer: "rejected_food_processing_officer",
//   complete: "complete",
//   rejectedByFoodTaster: "rejected_food_taster",
// };

export const state = {
  awaitingClientEngagementOfficer: "awaiting_client_engagement_officer",
  awaitngFoodProcessingOfficer: " awaiting_clientEngagement_officer",
  awaitingFoodTaster: "awaiting_food_taster",
  complete: 4,
};

export const last_action = {
  complaints_initiated: "complaints_initiated",
  approvedByClientEngagementOfficer: "approved_clientengagement_officer",
  approvedByFoodProcessingOfficer: "approved_food_processing_officer",
  rejectedByFoodProcessingOfficer: "rejected_food_processing_officer",
  approvedByFoodTaster: "approved_food_taster",
  rejectedByFoodTaster: "rejected_food_taster",
};

export const appStateData = {
  state,
  last_action,
};
