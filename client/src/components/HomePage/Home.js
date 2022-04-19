import React from "react";
import { Header } from "../../shared";
import { authenticationService } from "../../_services";
import { LeftSideBar } from "../../shared";
import greetingImg from "../../assets/images/greetingImg.png";

export function Home() {
  const loggedIn = authenticationService.currentUserValue;
  return (
    <React.Fragment>
      <Header />
      <div className='container-fluid'>
        <div className='row flex-wrap'>
          <LeftSideBar />
          <div className='col-sm-12 col-md-9 col-lg-9 col-xl-7 py-3'>
            {" "}
            <h6>
              <img src={greetingImg} alt='welcome message' />
              {`Good Morning ${loggedIn.user}`}
            </h6>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
