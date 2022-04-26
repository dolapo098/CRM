import React from "react";
import { Accordion } from "react-bootstrap"; //https://react-bootstrap.github.io/components/accordion/ used to build vertical collapsible elements
import { CardTexts } from "./CardTexts";

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
                      <CardTexts label='Initiator' value={val.initiator} />
                      <CardTexts
                        label='Sales Receipt No'
                        value={val.salesInvoiceId}
                      />

                      <CardTexts label='Client Comment' value={val.comment} />
                      <CardTexts label='State' value={val.state} />
                      <CardTexts label='Last Action' value={val.last_action} />
                      <CardTexts
                        label='Last Reviewed By'
                        value={val.last_reviewed_by}
                      />
                      <CardTexts
                        label='Client Officer Comment'
                        value={val.client_oficer_comment}
                      />
                      <CardTexts
                        label='Food Officer Comment'
                        value={val.food_processing_officer_comment}
                      />
                      <CardTexts
                        label='Food Taster Comment'
                        value={val.food_taster_comment}
                      />
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
