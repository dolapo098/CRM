import React, { useState } from "react";
import { Formik, Form } from "formik"; //https://formik.org/ //Formik is a small group of React components and hooks for building forms in React
import * as yup from "yup"; //https://www.npmjs.com/package/yup#api
import { Modal } from "react-bootstrap"; //https://react-bootstrap.github.io/components/modal/
import { TextField, FileUpload } from "../shared/_formcomponents";
import { complaintsService } from "../_services";

export function RequestModal(props) {
  let [attachmentId, setUploadedFileId] = useState("");
  let [isSuccess, setIsSuccess] = useState(false);
  let [isError, setIsError] = useState(false);

  const handleClose = () => {
    props.close(false);
    setIsSuccess(false);
    setIsError(false);
  };

  //validate the form fields via formik library
  let validateSchema = yup.object().shape({
    salesInvoiceId: yup.string().required(),
    attachmentId: yup.string(),
    comment: yup.string().required(),
  });

  //submit the form fields via formik library
  const onSubmit = (
    { salesInvoiceId, comment },
    { setStatus, setSubmitting }
  ) => {
    setStatus();
    setIsError(false);
    setIsSuccess(false);
    complaintsService
      .initiateRequest({
        salesInvoiceId,
        comment,
        attachmentId,
      })
      .then(
        (data) => {
          setIsSuccess(true);
          setIsError(false);
          setStatus("Successful");
          setSubmitting(false);
        },
        (error) => {
          setIsSuccess(false);
          setIsError(true);
          setSubmitting(false);
          setStatus(error);
        }
      );
  };

  //Get AttachmentId once a file is uploaded
  const getAttachmentId = (id) => {
    console.log(id);
    setUploadedFileId(id);
  };

  return (
    <React.Fragment>
      <>
        <Modal
          contentClassName='modal-height'
          show={props.show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <h6>Create New Request</h6>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                comment: "",
                salesInvoiceId: "",
              }}
              validationSchema={validateSchema}
              onSubmit={onSubmit}
            >
              {({ status, isSubmitting }) => (
                <Form>
                  <TextField
                    fieldtype='input'
                    label='Sales Invoice No'
                    name='salesInvoiceId'
                    placeholder='Enter Sales Invoice Id'
                  />
                  <TextField
                    fieldtype='textarea'
                    label='Comment'
                    name='comment'
                    placeholder='Type Comment'
                  />

                  <FileUpload getFileId={getAttachmentId} />
                  <div className='mt-5 mb-2'>
                    <button type='submit' className='btn btn-sm submit w-100'>
                      Send
                    </button>
                    {isSubmitting && (
                      <img
                        alt='loading'
                        src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                      />
                    )}
                  </div>
                  {isError && (
                    <div className={"alert alert-danger"}>{status}</div>
                  )}
                  {isSuccess && (
                    <div className=' mt-1 alert alert-success h-3'>
                      {status}
                    </div>
                  )}
                </Form>
              )}
            </Formik>{" "}
          </Modal.Body>
        </Modal>
      </>
    </React.Fragment>
  );
}
