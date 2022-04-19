import React from "react";
import { Accordion } from "react-bootstrap"; //https://react-bootstrap.github.io/components/accordion/ used to build vertical collapsible elements

export function RightSideBar(props) {
  return (
    <React.Fragment>
      <div className=' col-xl-3  d-none d-xl-block  d-none  bg-img-left'>
        <div className='card mt-5 '>
          <div className='card-body'>
            <h5 className='card-title mb-3'>Pending Tasks</h5>

            {props.complaints.map((val, index) => (
              <React.Fragment key={index}>
                <Accordion defaultActiveKey='0'>
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>Ticket No {val.id}</Accordion.Header>
                    <Accordion.Body>
                      <p>
                        {" "}
                        <strong>id</strong> <mark>{val.id}</mark>
                      </p>
                      <p>
                        {" "}
                        <strong>State</strong> <mark>{val.state}</mark>
                      </p>
                      <p>
                        {" "}
                        <strong>Comment</strong> <mark>{val.comment}</mark>
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
