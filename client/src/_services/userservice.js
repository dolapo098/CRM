import axios from "axios";

import { authHeader, HandleError } from "../_helper";

const apiUrl = process.env.REACT_APP_BASEURL_DEMO;

export const userService = {
  getAll,
  getById,
};

//the api request to get a user by firstname or phone number  from the service
async function getById(id) {
  const requestOptions = {
    method: "get",
    headers: authHeader(),
    url: `${apiUrl}/api/v1/company/${id} `,
  };
  try {
    let response = await axios(requestOptions);
    response = response.data;
    return response;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to get all the users from the service
async function getAll(page, pageSize, params) {
  const requestOptions = {
    method: "get",
    headers: authHeader(),
    url: `${apiUrl}/api/v1/company?page=${page}&pageSize=${pageSize}&filterText=${params} `,
  };
  try {
    let response = await axios(requestOptions);
    response = response.data;
    return response;
  } catch (error) {
    throw HandleError(error);
  }
}
