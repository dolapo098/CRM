import React from "react";
import { Field } from "formik";

export function DefaultTextField(props) {
  return (
    <div className='mb-4'>
      <label htmlFor='exampleFormControlInput1' className='form-label'>
        {props.label}
      </label>
      <Field
        as={props.fieldtype}
        type={props.type ? props.type : "text"}
        name={props.name}
        className='form-control form-control-sm'
        placeholder={props.placeholder}
        disabled
      />
    </div>
  );
}
