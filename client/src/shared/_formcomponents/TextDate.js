import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "../_formcomponents";

export function TextDate(props) {
  return (
    <div className='mb-3'>
      <label htmlFor='exampleFormControlInput1' className='form-label'>
        {props.label}
      </label>
      <Field
        type='date'
        name={props.name}
        className='form-control'
        id='exampleFormControlInput1'
        placeholder='name@example.com'
      />
      <ErrorMessage name={props.name} component={TextError} />
    </div>
  );
}
