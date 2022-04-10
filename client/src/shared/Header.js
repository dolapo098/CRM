import React from "react";
import { Navbar, Nav, Container, Form, Col, FormGroup } from "react-bootstrap";

export function Header() {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
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

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav>
            <Nav.Link eventKey={2} href='#memes'>
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
