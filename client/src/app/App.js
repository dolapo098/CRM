import React, { useState } from "react";
import { NewRequest } from "../components/Complaints";
import greetingImg from "../assets/images/greetingImg.png";

export function App() {
  const [requestModal, setRequestModal] = useState(false);

  const createNewRequest = () => {
    setRequestModal(true);
  };

  return (
    <React.Fragment>
      <NewRequest show={requestModal} close={setRequestModal} />
      <div className='container-fluid'>
        <div className='row flex-wrap'>
          <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-orange'>
            <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 mt-5 text-white min-vh-100'>
              <ul
                className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
                id='menu'
              >
                <li className='nav-item'>
                  <a href='/' className='nav-link align-middle px-0  t'>
                    <span className='ms-1 d-none d-sm-inline text-dark '>
                      <i
                        className='fa fa-home marginRight'
                        aria-hidden='true'
                      ></i>
                      Home
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href='#submenu1'
                    data-bs-toggle='collapse'
                    className='nav-link px-0 align-middle'
                  >
                    <i className='fs-4 bi-speedometer2'></i>{" "}
                    <span className='ms-1 d-none d-sm- text-dark'>
                      <i className='fas fa-bars marginRight'></i>Requests
                    </span>{" "}
                  </a>
                  <ul
                    className='collapse show nav flex-column ms-1'
                    id='submenu1'
                    data-bs-parent='#menu'
                  >
                    <li className='w-100'>
                      <a href='/' className='nav-link px-0'>
                        {" "}
                        <span className='d-none d-sm-inline text-dark'>
                          <i
                            className='fa fa-cog marginRight'
                            aria-hidden='true'
                          ></i>
                          Settings
                        </span>{" "}
                        1{" "}
                      </a>
                    </li>
                    <li>
                      <a href='/' className='nav-link px-0'>
                        {" "}
                        <span className='d-none d-sm-inline text-dark'>
                          <i
                            className='fa fa-sign-out marginRight'
                            aria-hidden='true'
                          ></i>
                          Sign Out
                        </span>{" "}
                        2{" "}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <hr />
            </div>
          </div>
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
                <div class='input-group input-group-sm mb-3'>
                  <div class='input-group-prepend'></div>
                  <input
                    type='text'
                    placeholder='Serch By'
                    className='form-control form-control-sm'
                    aria-label='Small'
                    aria-describedby='inputGroup-sizing-sm'
                  />
                </div>
                <table className='table table-sm caption-top'>
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
          <div className='col-md-3  d-none d-md-block bg-img-left'>
            <div className='card mt-5 '>
              <div className='card-body'>
                <h5 className='card-title mb-3'>Login to Continue</h5>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
