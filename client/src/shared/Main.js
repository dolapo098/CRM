import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { authenticationService } from "../_services";
import { RequestModal, PaginationTab, RequestsTable } from "../shared";
import greetingImg from "../assets/images/greetingImg.png";

export function Main(props) {
  let location = useLocation();
  const clientUrl = "/initiator";

  const loggedIn = authenticationService.currentUserValue;

  const [requestModal, setRequestModal] = useState(false);

  const createNewRequest = () => {
    setRequestModal(true);
  };

  return (
    <React.Fragment>
      <RequestModal show={requestModal} close={setRequestModal} />
      <div className='col-sm-12 col-md-9 col-lg-9 col-xl-7 py-3'>
        {" "}
        <h6>
          <img src={greetingImg} alt='welcome message' />
          {`Good Morning  ${loggedIn?.user}`}
        </h6>
        {location.pathname === clientUrl && (
          <div className='card mt-5 bg-orange'>
            <div className='card-body center'>
              <div
                className='d-flex justify-content-center'
                onClick={createNewRequest}
              >
                <i className='fa fa-plus-circle ' aria-hidden='true'></i>
              </div>

              <h6 className='mt'>Create New Request</h6>
            </div>
          </div>
        )}
        <div>
          <RequestsTable complaints={props.complaints} />
          <PaginationTab pagObj={props.pagObj} />
        </div>
      </div>
    </React.Fragment>
  );
}
