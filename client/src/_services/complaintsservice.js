import axios from "axios"; //https://www.npmjs.com/package/axios   axios is a promised based http client for node
import { authHeader, HandleError, fileHeader } from "../_helper";

const apiUrl = process.env.REACT_APP_BASEURL_DEMO;

export const complaintsService = {
  getAll,
  getById,
  fileUpload,
  initiateRequest,
  reviewRequest,
  downloadAttachment,
  foodProcessingOfficerreview,
  foodTasterreview,
  foodOfficerGetComplaints,
  getAllCompleteRequest,
  foodTasterGetComplaints,
  clientOfficerGetComplaints,
};

// api request to upload file
async function fileUpload(selectedFile) {
  const formData = new FormData();
  formData.append("file", selectedFile, selectedFile.name);
  const requestOptions = {
    method: "post",
    headers: authHeader(),
    url: `${apiUrl}/crm/api/fileUpload`,
    data: formData,
  };

  try {
    let response = await axios(requestOptions);
    response = response.data;
    return response;
  } catch (error) {
    throw HandleError(error);
  }
}

//the api request to get a user by firstname or phone number  from the service
async function getById(id) {
  const requestOptions = {
    method: "get",
    headers: authHeader(),
    url: `${apiUrl}/crm/api/complaint/${id} `,
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
async function getAll(params) {
  const requestOptions = {
    method: "get",
    headers: authHeader(),
    url: `${apiUrl}/crm/api/complaints?page=${params.page}&pageSize=${params.pageSize}`,
  };
  try {
    let response = await axios(requestOptions);
    response = response.data;
    return response;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to get all complaints for the client officer
async function clientOfficerGetComplaints(params) {
  const requestOptions = {
    method: "get",
    headers: authHeader(),
    url: `${apiUrl}/crm/api/clientofficer/complaints?page=${params.page}&pageSize=${params.pageSize}`,
  };
  try {
    let response = await axios(requestOptions);
    response = response.data;
    return response;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to get all complaints for the client officer
async function getAllCompleteRequest(params) {
  const requestOptions = {
    method: "get",
    headers: authHeader(),
    url: `${apiUrl}/crm/api/complete/complaints?page=${params.page}&pageSize=${params.pageSize}`,
  };
  try {
    let response = await axios(requestOptions);
    response = response.data;
    return response;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to get all complaints for the food officer
async function foodOfficerGetComplaints(params) {
  const requestOptions = {
    method: "get",
    headers: authHeader(),
    url: `${apiUrl}/crm/api/foodofficer/complaints?page=${params.page}&pageSize=${params.pageSize}`,
  };
  try {
    let response = await axios(requestOptions);
    response = response.data;
    return response;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to get all complaints for the food officer
async function foodTasterGetComplaints(params) {
  const requestOptions = {
    method: "get",
    headers: authHeader(),
    url: `${apiUrl}/crm/api/foodtaster/complaints?page=${params.page}&pageSize=${params.pageSize}`,
  };
  try {
    let response = await axios(requestOptions);
    response = response.data;
    return response;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to make complaints
async function initiateRequest(params) {
  try {
    let config = {
      method: "post",
      headers: authHeader(),
      data: params,
      url: `${apiUrl}/crm/api/complaints/initiate`,
    };

    let response = await axios(config);
    const data = response.data;
    return data;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to make complaints
async function reviewRequest(params) {
  try {
    let config = {
      method: "post",
      headers: authHeader(),
      data: params,
      url: `${apiUrl}/crm/api/complaints/review/engagementofficer/${params.id}`,
    };

    let response = await axios(config);
    const data = response.data;
    return data;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to make complaints for food processing officer
async function foodProcessingOfficerreview(params) {
  try {
    let config = {
      method: "post",
      headers: authHeader(),
      data: params,
      url: `${apiUrl}/crm/api/complaints/review/foodprocessingofficer/${params.id}`,
    };

    let response = await axios(config);
    const data = response.data;
    return data;
  } catch (error) {
    throw HandleError(error);
  }
}

//The api request to make complaints for foodtaster
async function foodTasterreview(params) {
  try {
    let config = {
      method: "post",
      headers: authHeader(),
      data: params,
      url: `${apiUrl}/crm/api/complaints/review/foodtaster/${params.id}`,
    };

    let response = await axios(config);
    const data = response.data;
    return data;
  } catch (error) {
    throw HandleError(error);
  }
}

async function downloadAttachment(filename) {
  const requestOptions = {
    method: "get",
    url: `${apiUrl}/crm/api/download?filePath=${filename}`,
    responseType: "arraybuffer",
    headers: fileHeader(),
  };
  try {
    let response = await axios(requestOptions);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "" + filename + "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    var enc = new TextDecoder("utf-8");
    var arr = new Uint8Array(error.response.data);
    const msg = enc.decode(arr);
    throw msg;
  }
}
