import React from "react";
import { Modal } from "react-bootstrap";

export function NewRequest(props) {
  console.log(props.show);
  const handleClose = () => {
    props.close(false);
  };
  return (
    <React.Fragment>
      <>
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h6>Create New Request</h6>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className='mb-3'>
              <label htmlFor='exampleFormControlInput1' className='form-label'>
                Invoice No
              </label>
              <input
                type='text'
                className='form-control form-control-sm'
                placeholder='name@example.com'
              />
            </div>
            <div className='mb-3'>
              <label
                htmlFor='exampleFormControlTextarea1'
                className='form-label'
              >
                Address
              </label>
              <input
                type='password'
                className='form-control form-control-sm'
                placeholder='name@example.com'
              />
            </div>
            <div className='mb-3'>
              <label
                htmlFor='exampleFormControlTextarea1'
                className='form-label'
              >
                Phone No
              </label>
              <input
                type='password'
                className='form-control form-control-sm'
                placeholder='name@example.com'
              />
            </div>
            <div className='mb-3'>
              <label
                htmlFor='exampleFormControlTextarea1'
                className='form-label'
              >
                Comment
              </label>
              <textarea
                type='password'
                className='form-control form-control-sm'
                placeholder='name@example.com'
              />
            </div>
            <div className='input-group mb-3'>
              <input type='file' className='form-control form-control-sm' />
              <button className='btn btn-sm submit' type='button'>
                Upload Evidence
              </button>
            </div>
            <div className='mt-5 '>
              <button
                type='submit'
                className='form-control form-control-sm submit'
              >
                Send
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
      );
    </React.Fragment>
  );
}
