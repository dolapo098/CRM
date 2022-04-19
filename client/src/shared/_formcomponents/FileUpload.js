import React, { useState } from "react";
import { complaintsService } from "../../_services";
import GetComplaintDetails from "../GetComplaintDetails";

export function FileUpload(props) {
  let {
    isSubmmitted,
    setIsSubmited,
    isSuccess,
    setIsSucces,
    isFailed,
    isError,
    setIsError,
    setIsFailed,
  } = GetComplaintDetails();

  // The properties below are used to manage the states within the components using react hooks usestate
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  //event handker to change the file type
  const handleFile = (e) => {
    setIsFileSelected(false);
    setIsSucces(false);
    setIsError("");
    setSelectedFile(e.target.files[0]);
  };

  // upload file to the api
  const uploadFile = async () => {
    setIsSubmited(true);
    setIsSucces(false);
    setIsError("");
    setIsFailed(false);

    if (!selectedFile) {
      setIsFileSelected(true);
      setIsSubmited(false);
    }
    if (selectedFile) {
      setIsFileSelected(false);
      complaintsService
        .fileUpload(selectedFile)
        .then((res) => {
          props.getFileId(res?.data?.filename);
          setIsSubmited(false);
          setIsSucces(true);
        })
        .catch((err) => {
          setIsSubmited(false);
          setIsFailed(true);
          setIsError(err);
        });
    }
  };

  return (
    <div>
      <div className='input-group mb-3 mt-5'>
        <input
          type='file'
          accept='image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          name='file'
          size='sm'
          aria-describedby='basic-addon1'
          className='form-control form-control-sm'
          onChange={handleFile}
        />
        <button
          className='btn btn-sm submit'
          type='button'
          onClick={uploadFile}
        >
          {isSubmmitted && (
            <img
              alt='loading'
              src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
            />
          )}
          attachment
        </button>
      </div>
      {isFileSelected && (
        <small className='text-danger position-absolute '>
          Please select a file
        </small>
      )}
      {isFailed && (
        <small className='text-danger position-absolute '>{isError}</small>
      )}
      {isSuccess && (
        <small className='text-success position-absolute '>
          file uploaded successfully
        </small>
      )}
    </div>
  );
}
