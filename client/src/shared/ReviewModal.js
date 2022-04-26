import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik"; //https://formik.org/ //Formik is a small group of React components and hooks for building forms in React
import * as yup from "yup"; //https://www.npmjs.com/package/yup#api
import { Modal } from "react-bootstrap"; //https://react-bootstrap.github.io/components/modal/
import { TextField } from "../shared/_formcomponents";
import { complaintsService } from "../_services";
import GetComplaintDetails from "./GetComplaintDetails";
import { appStateData } from "../_helper";

export function ReviewModal(props) {
  const { setFormData, formData } = GetComplaintDetails();
  let [isSuccess, setIsSuccess] = useState(false);
  let [isError, setIsError] = useState(false);

  let { id, state, last_action } = formData;

  useEffect(() => {
    if (props.complaintsId) {
      //get a complaints request by Id
      complaintsService.getById(props.complaintsId).then(
        (res) => {
          setFormData({
            id: res?.data?.id,
            comment: res?.data?.comment,
            attachmentId: res?.data?.attachmentId,
            salesInvoiceId: res?.data?.salesInvoiceId,
            reviewedBy: res?.data?.reviewedBy,
            state: res?.data?.state,
            last_action: res?.data?.last_action,
          });
        },
        (err) => console.log(err)
      );
    }
  }, [props.complaintsId, setFormData]);

  const handleClose = () => {
    props.close(false);
    setIsError(false);
    setIsSuccess(false);
  };

  //download attachment if a file was uploaded
  const downloadAttachment = () => {
    complaintsService.downloadAttachment(formData.attachmentId).then(
      (res) => {},
      (err) => {
        console.log(err);
      }
    );
  };

  //set the approval state workflow beform form is submitted

  //validate the form fields via formik library
  let validateSchema = yup.object().shape({
    client_officer_comment: yup.string().required(),
  });

  //submit the form fields via formik library
  const onSubmit = (
    { client_officer_comment },
    { setStatus, setSubmitting }
  ) => {
    console.log("yanaga");
    setStatus();
    setIsSuccess(false);
    complaintsService.reviewRequest({ id, client_officer_comment, state }).then(
      (res) => {
        setIsSuccess(true);
        setStatus("Successful");
        setSubmitting(false);
      },
      (err) => {
        setSubmitting(false);
        setIsError(true);
        setStatus(err);
      }
    );
  };

  function approve() {
    if (
      last_action === appStateData.last_action.complaints_initiated ||
      last_action === appStateData.last_action.rejectedByFoodProcessingOfficer
    ) {
      setFormData({
        ...formData,
        state: appStateData.state.awaitngFoodProcessingOfficer,
      });
    }
  }

  return (
    <React.Fragment>
      <>
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h6>Review Task</h6>
          </Modal.Header>
          <Modal.Body>
            {formData.attachmentId && (
              <div className='mb-3'>
                <div>Attachment</div>
                <button
                  type='button'
                  className='btn btn-sm btn-warning'
                  onClick={downloadAttachment}
                >
                  {" "}
                  <i className='fa fa-download fa-xs' aria-hidden='true'></i>
                </button>
              </div>
            )}
            <Formik
              enableReinitialize={false}
              initialValues={{
                client_officer_comment: "",
                state,
              }}
              validationSchema={validateSchema}
              onSubmit={onSubmit}
            >
              {({ status, isSubmitting }) => (
                <Form>
                  <TextField
                    fieldtype='textarea'
                    label='Comment'
                    name='client_officer_comment'
                    placeholder='Type Comment'
                  />

                  <div className='container mt-4'>
                    {" "}
                    <button
                      type='submit'
                      className='btn btn-sm submit '
                      onClick={approve}
                    >
                      Approve
                    </button>{" "}
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
                    <div className='alert alert-success '>{status}</div>
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
