import React from "react";

export function TextError(props) {
  return (
    <small className='text-danger position-absolute '>{props.children}</small>
  );
}
