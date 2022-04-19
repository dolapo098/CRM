import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; //https://v5.reactrouter.com/web/api/Hooks/uselocation
import { Navbar, Nav, Container, Form, Col, FormGroup } from "react-bootstrap";
import { authenticationService } from "../_services";

export function Header() {
  const location = useLocation(); //returns the location object that represents the present url
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    let mounted = true;
    // get the roles for the current users to set the view pages for active users //refer to the authentication service
    authenticationService.currentUser.subscribe((x) => {
      if (mounted) {
        setCurrentUser(x);
      }
    });
    mounted = false;
  }, []);

  function logout() {
    authenticationService.logout();
  }
  return (
    <React.Fragment>
      {currentUser && (
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Container>
            <Navbar.Brand href='#home'>Complaints Portal</Navbar.Brand>
            {location.pathname !== "/" && (
              <Col>
                <FormGroup>
                  <Form.Control
                    type='search'
                    id='inputPassword5'
                    aria-describedby='passwordHelpBlock'
                    size='sm'
                  />
                </FormGroup>
              </Col>
            )}

            <Navbar.Toggle aria-controls='responsive-navbar-nav' />

            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'></Nav>
              <Nav>
                <button
                  type='button'
                  className='btn btn-warning'
                  onClick={logout}
                >
                  Log Out
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </React.Fragment>
  );
}
