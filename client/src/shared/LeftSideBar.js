import React, { useState, useEffect } from "react";
import { authenticationService } from "../_services";
import { roles } from "../_helper";

export function LeftSideBar() {
  const [currentUser, setCurrentUser] = useState("");
  const [client, setClient] = useState(false);
  const [clientEngagementOfficer, setClientEngagementOfficer] = useState(false);
  const [foodProcessingOfficer, setFoodProcessingOfficer] = useState(false);
  const [foodTaster, setFoodTaster] = useState(false);

  useEffect(() => {
    let mounted = true;
    // get the roles for the current users to set the view pages for active users //refer to the authentication service
    authenticationService.currentUser.subscribe((x) => {
      if (mounted) {
        setCurrentUser(x);
        setClient(x?.role === roles.client);
        setClientEngagementOfficer(x?.role === roles.client_engagement_officer);
        setFoodProcessingOfficer(x?.role === roles.food_processing_officer);
        setFoodTaster(x?.role === roles.food_taster);
      }
    });
    mounted = false;
  }, []);

  return (
    <React.Fragment>
      <div className='col-auto col-md-3 col-lg-3 col-xl-2  d-none d-md-block px-sm-2 px-0 bg-orange leftCol'>
        <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 mt-5 text-white '>
          {currentUser && (
            <ul
              className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
              id='menu'
            >
              <li className='nav-item mb-1'>
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
                <ul
                  className='collapse show nav flex-column ms-1'
                  id='submenu1'
                  data-bs-parent='#menu'
                >
                  {client && (
                    <li className='w-100 mb-1'>
                      <a href='/initiator' className='nav-link px-0 '>
                        {" "}
                        <span className='d-none d-sm-inline text-dark'>
                          <i
                            className='fa fa-plus marginRight'
                            aria-hidden='true'
                          ></i>
                          Create Complaints
                        </span>{" "}
                      </a>
                    </li>
                  )}
                  {clientEngagementOfficer && (
                    <li className='w-100 mb-1'>
                      <a
                        href='/clientengagementofficer'
                        className='nav-link px-0 '
                      >
                        {" "}
                        <span className='d-none d-sm-inline text-dark'>
                          <i
                            className='fa fa-clock-o marginRight'
                            aria-hidden='true'
                          ></i>
                          Requests
                        </span>{" "}
                      </a>
                    </li>
                  )}
                  {foodProcessingOfficer && (
                    <li className='w-100 mb-1'>
                      <a
                        href='/foodprocessingofficer'
                        className='nav-link px-0 '
                      >
                        {" "}
                        <span className='d-none d-sm-inline text-dark'>
                          <i
                            className='fa fa-clock-o marginRight'
                            aria-hidden='true'
                          ></i>
                          Requests
                        </span>{" "}
                      </a>
                    </li>
                  )}
                  {foodTaster && (
                    <li className='w-100 mb-1'>
                      <a href='/foodtaster' className='nav-link px-0 '>
                        {" "}
                        <span className='d-none d-sm-inline text-dark'>
                          <i
                            className='fa fa-clock-o marginRight'
                            aria-hidden='true'
                          ></i>
                          Requests
                        </span>{" "}
                      </a>
                    </li>
                  )}
                  {!client && (
                    <li className='w-100 mb-1'>
                      <a href='/completedrequests' className='nav-link px-0'>
                        {" "}
                        <span className='d-none d-sm-inline text-dark'>
                          <i className='fa-solid fa-receipt marginRight'></i>
                          Reports
                        </span>{" "}
                      </a>
                    </li>
                  )}
                  {/* <li className='w-100 mb-1'>
                    <a href='/' className='nav-link px-0'>
                      {" "}
                      <span className='d-none d-sm-inline text-dark'>
                        <i className='fa-solid fa-receipt marginRight'></i>
                        Sales Invoice Logs
                      </span>{" "}
                    </a>
                  </li> */}
                  {/* <li className='w-100 mb-1'>
                    <a href='/' className='nav-link px-0'>
                      {" "}
                      <span className='d-none d-sm-inline text-dark'>
                        <i
                          className='fa fa-sign-out marginRight'
                          aria-hidden='true'
                        ></i>
                        Sign Out
                      </span>{" "}
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
          )}

          <hr />
        </div>
      </div>
    </React.Fragment>
  );
}
