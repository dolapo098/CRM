import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ReviewModal,
  FoodOfficerReviewModal,
  FoodTasterReviewModal,
  // ClientModal,
  ClientOfficerModal,
  FoodOfficerModal,
  FoodTasterModal,
} from "../../shared";

export function RequestsTable(props) {
  let location = useLocation();
  const clientUrl = "/initiator";
  const [requestModal, setRequestModal] = useState(false);
  // const [clientModal, setClientModal] = useState(false);
  const [isFoodOfficerModal, setFoodOfficerModal] = useState(false);
  const [isFoodTasterModal, setFoodTasterModal] = useState(false);
  const [complaintsId, setComplaintsId] = useState(null);

  // checck the type of modal page for reviews
  const viewMore = (id, state) => {
    setComplaintsId(id);

    let switchModal = [
      // new ClientModal(state, setClientModal),
      new ClientOfficerModal(state, setRequestModal),
      new FoodOfficerModal(state, setFoodOfficerModal),
      new FoodTasterModal(state, setFoodTasterModal),
    ];

    // call the SwichModal classes and set the type of modal page
    switchModal.forEach((val) => {
      val.showReviewModal();
    });
  };

  return (
    <React.Fragment>
      {requestModal && (
        <ReviewModal
          show={requestModal}
          close={setRequestModal}
          complaintsId={complaintsId}
        />
      )}
      {isFoodOfficerModal && (
        <FoodOfficerReviewModal
          show={isFoodOfficerModal}
          close={setFoodOfficerModal}
          complaintsId={complaintsId}
        />
      )}
      {isFoodTasterModal && (
        <FoodTasterReviewModal
          show={isFoodTasterModal}
          close={setFoodTasterModal}
          complaintsId={complaintsId}
        />
      )}
      <div className='table-responsive mt-5 '>
        <table className='table table-hover table-bordered table-sm caption-top'>
          <caption> Pending Requests</caption>

          <thead>
            <tr>
              <th scope='col'>Request Id</th>
              <th scope='col'>Sales Invoice No</th>
              <th scope='col'>Comment</th>
              <th scope='col'>Initiator</th>
              {location.pathname !== clientUrl && (
                <th scope='col'>Last Action</th>
              )}
              {location.pathname !== clientUrl && (
                <th scope='col'>Last Reviewed By</th>
              )}

              <th scope='col'>State</th>
              {location.pathname !== clientUrl && <th></th>}
            </tr>
          </thead>

          {props.complaints.map((val, index) => (
            <React.Fragment key={index}>
              <tbody>
                <tr>
                  <th scope='row'>{val.id}</th>
                  <td>{val.salesInvoiceId}</td>
                  <td>{val.comment}</td>
                  <td>{val.initiator}</td>
                  {location.pathname !== clientUrl && (
                    <td>{val.last_action}</td>
                  )}
                  {location.pathname !== clientUrl && (
                    <td>{val.last_reviewed_by}</td>
                  )}

                  <td>{val.state}</td>

                  {location.pathname !== clientUrl && (
                    <td>
                      {" "}
                      <div onClick={() => viewMore(val.id, val.state)}>
                        <i className='fa fa-eye ' aria-hidden='true'></i>
                      </div>
                    </td>
                  )}
                </tr>
              </tbody>
            </React.Fragment>
          ))}
        </table>
      </div>
    </React.Fragment>
  );
}
