import React, { useState } from "react";
import { RequestModal } from "../shared";
import greetingImg from "../assets/images/greetingImg.png";

export function Main() {
  const [requestModal, setRequestModal] = useState(false);
  const createNewRequest = () => {
    setRequestModal(true);
  };

  return (
    <React.Fragment>
      <RequestModal show={requestModal} close={setRequestModal} />
      <div className='col py-3'>
        {" "}
        <h6>
          <img src={greetingImg} alt='welcome message' />
          Good Morning Phillip
        </h6>
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
        <div>
          <div className='table-responsive mt-5 '>
            <table className='table table-striped table-sm caption-top'>
              <caption> Pending Requests</caption>

              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>First</th>
                  <th scope='col'>Last</th>
                  <th scope='col'>Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope='row'>2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope='row'>3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
