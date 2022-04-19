import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik"; //https://formik.org/ //Formik is a small group of React components and hooks for building forms in React
import * as yup from "yup"; //https://www.npmjs.com/package/yup#api
import { Modal } from "react-bootstrap"; //https://react-bootstrap.github.io/components/modal/
import { TextField } from "../shared/_formcomponents";
import { complaintsService } from "../_services";
import GetComplaintDetails from "./GetComplaintDetails";
import { appStateData } from "../_helper";

export function FoodTasterReviewModal(props) {
  const { setFormData, formData } = GetComplaintDetails();
  let [isSuccess, setIsSuccess] = useState(false);

  let { id, state, status } = formData;

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
            status: res?.data?.status,
          });
        },
        (err) => console.log(err)
      );
    }
  }, [props.complaintsId, setFormData]);

  const handleClose = () => {
    props.close(false);
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
  const approve = () => {
    if (status === appStateData.status.awaitingClientEngagementOfficer) {
      setFormData({
        ...formData,
        state: appStateData.state.approvedByClientEngagementOfficer,
      });
    } else if (status === appStateData.status.awaitngFoodProcessingOfficer) {
      setFormData({
        ...formData,
        state: appStateData.state.approvedByFoodProcessingOfficer,
      });
    } else if (status === appStateData.status.awaitingFoodTaster) {
      setFormData({
        ...formData,
        state: appStateData.state.complete,
      });
    }
  };

  //set the  state the rejected state workflow beform form is submitted
  const reject = () => {
    if (status === appStateData.status.awaitingFoodTaster) {
      setFormData({
        ...formData,
        state: appStateData.state.rejectedByFoodTaster,
      });
    }
  };

  //validate the form fields via formik library
  let validateSchema = yup.object().shape({
    food_taster_comment: yup.string().required(),
  });

  //submit the form fields via formik library
  const onSubmit = ({ food_taster_comment }, { setStatus, setSubmitting }) => {
    setIsSuccess(false);
    setStatus();
    complaintsService.foodTasterreview({ id, food_taster_comment, state }).then(
      (res) => {
        setIsSuccess(true);
        setSubmitting(false);
      },
      (err) => {
        setSubmitting(false);
        setStatus(err);
        console.log(err);
      }
    );
  };

  return (
    <React.Fragment>
      <>
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h6>Food Taster Review Task</h6>
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
                food_taster_comment: "",
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
                    name='food_taster_comment'
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
                    <button
                      type='submit'
                      className='btn btn-danger btn-sm '
                      onClick={reject}
                    >
                      Reject
                    </button>
                    {isSubmitting && (
                      <img
                        alt='loading'
                        src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                      />
                    )}
                  </div>

                  {status && (
                    <div className={"alert alert-danger"}>{status}</div>
                  )}
                  {isSuccess && (
                    <small className='text-success position-absolute '>
                      successful
                    </small>
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
