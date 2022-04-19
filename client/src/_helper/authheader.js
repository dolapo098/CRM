import { authenticationService } from "../_services";
export function authHeader() {
  const currentUser = authenticationService.currentUserValue;

  if (!currentUser) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else if (currentUser) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": ` ${currentUser.tokenResult}`,
    };
  }
}

export function fileHeader() {
  const currentUser = authenticationService.currentUserValue;

  if (!currentUser) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else if (currentUser) {
    return {
      "Content-Type": "application/octet-stream",
      "x-access-token": ` ${currentUser.tokenResult}`,
    };
  }
}
