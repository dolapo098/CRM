import { BehaviorSubject } from "rxjs"; //https://rxjs-dev.firebaseapp.com/
import axios from "axios";
import { authHeader, HandleError } from "../_helper";

const apiUrl = process.env.REACT_APP_BASEURL_DEMO;
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

async function login(firstName, password) {
  try {
    let config = {
      method: "post",
      headers: authHeader(),
      data: { firstName, password },
      url: `${apiUrl}/crm/api/authenticate`,
    };

    let response = await axios(config);
    const user = response.data;

    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem("currentUser", JSON.stringify(user?.data));
    currentUserSubject.next(user?.data);
    return user;
  } catch (error) {
    throw HandleError(error);
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
