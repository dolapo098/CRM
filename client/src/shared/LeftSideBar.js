import React from "react";

export function LeftSideBar() {
  return (
    <React.Fragment>
      <div className='col-auto col-md-3 col-xl-2  d-none d-md-block px-sm-2 px-0 bg-orange'>
        <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 mt-5 text-white min-vh-100'>
          <ul
            className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
            id='menu'
          >
            <li className='nav-item mb-1'>
              <a href='/' className='nav-link align-middle px-0  t'>
                <span className='ms-1 d-none d-sm-inline text-dark '>
                  <i className='fa fa-home marginRight' aria-hidden='true'></i>
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
                <li className='w-100 mb-1'>
                  <a href='/' className='nav-link px-0 '>
                    {" "}
                    <span className='d-none d-sm-inline text-dark'>
                      <i
                        class='fa fa-cart-arrow-down marginRight'
                        aria-hidden='true'
                      ></i>
                      Requests
                    </span>{" "}
                  </a>
                </li>

                <li className='w-100 mb-1'>
                  <a href='/' className='nav-link px-0'>
                    {" "}
                    <span className='d-none d-sm-inline text-dark'>
                      <i
                        className='fa fa-cog marginRight'
                        aria-hidden='true'
                      ></i>
                      Settings
                    </span>{" "}
                  </a>
                </li>
                <li className='w-100 mb-1'>
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
                </li>
              </ul>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </React.Fragment>
  );
}
