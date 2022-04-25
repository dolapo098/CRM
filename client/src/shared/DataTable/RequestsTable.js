import React, { useState } from "react";
import {
  ReviewModal,
  FoodOfficerReviewModal,
  FoodTasterReviewModal,
  ClientModal,
  ClientOfficerModal,
  FoodOfficerModal,
  FoodTasterModal,
  ClientOfficerStatusData,
  CompleteStatusData,
  FoodOfficerStatusData,
  FoodTasterStatusData,
} from "../../shared";

export function RequestsTable(props) {
  const [requestModal, setRequestModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [isFoodOfficerModal, setFoodOfficerModal] = useState(false);
  const [isFoodTasterModal, setFoodTasterModal] = useState(false);
  const [complaintsId, setComplaintsId] = useState(null);
  const [status, setStatus] = useState("");

  // checck the type of modal page for reviews
  const viewMore = (id, state) => {
    setComplaintsId(id);

    let switchModal = [
      new ClientModal(state, setClientModal),
      new ClientOfficerModal(state, setRequestModal),
      new FoodOfficerModal(state, setFoodOfficerModal),
      new FoodTasterModal(state, setFoodTasterModal),
    ];

    let switchStatus = [
      new CompleteStatusData(state, setStatus),
      new ClientOfficerStatusData(state, setStatus),
      new FoodOfficerStatusData(state, setStatus),
      new FoodTasterStatusData(state, setStatus),
    ];

    // call the SwichModal classes and set the type of modal page
    switchModal.forEach((val) => {
      val.showReviewModal();
    });

    switchStatus.forEach((val) => val.showTableData());
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
              <th scope='col'>Reviewer</th>
              <th scope='col'>State</th>
              <th></th>
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
                  <td>{val.reviewedBy}</td>
                  <td>{val.state}</td>
                  <td>
                    {" "}
                    <div onClick={() => viewMore(val.id, val.status)}>
                      <i className='fa fa-eye ' aria-hidden='true'></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          ))}
        </table>
      </div>
    </React.Fragment>
  );
}
