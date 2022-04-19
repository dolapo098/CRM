// the mehod is used to get the api error and return the messages to the components
export function HandleError(error) {
  const BadRequest = 400;
  const unauthorizedCodes = [401, 403];
  const internal_server_error = 500;
  if (error?.response?.status === internal_server_error) {
    return error?.response?.data?.msg;
  } else if (error?.response?.status === BadRequest) {
    return error?.response?.data?.msg;
  } else if (
    error?.response &&
    unauthorizedCodes.includes(error?.response?.status)
  ) {
    return error.response.data.msg;
  }
}
