import React from "react";
import { Formik, Form } from "formik"; //https://formik.org/ //Formik is a small group of React components and hooks for building forms in React
import * as yup from "yup"; //https://www.npmjs.com/package/yup#api
import { history } from "../../_helper";
import food_img from "../../assets/images/dude.png";
import productLogo from "../../assets/images/fooddesign.png";
import { TextField, ButtonSubmit } from "../../shared/_formcomponents";
import { authenticationService } from "../../_services";

export function Login(props) {
  //validate the form fields via formik library
  let validateSchema = yup.object().shape({
    firstName: yup.string().required(),
    password: yup.string().required(),
  });

  //submit the form fields via formik library
  const onSubmit = ({ firstName, password }, { setStatus, setSubmitting }) => {
    setStatus();
    authenticationService.login(firstName, password).then(
      (user) => {
        user && history.push("/");
      },
      (error) => {
        setSubmitting(false);
        setStatus(error);
      }
    );
  };
  return (
    <React.Fragment>
      <div className='container'>
        <div className='row flex-wrap'>
          <div className='col-md-6 bg-img-left'>
            <div className='card mt-5'>
              <div className='card-header mb-4'>
                <img src={productLogo} alt='product name'></img>
                Product Name
              </div>
              <div className='card-body'>
                <h5 className='card-title mb-5'>Login to Continue</h5>

                <Formik
                  initialValues={{ firstName: "", password: "" }}
                  validationSchema={validateSchema}
                  onSubmit={onSubmit}
                >
                  {({ status, isSubmitting }) => (
                    <Form>
                      <TextField
                        fieldtype='input'
                        label='FirstName'
                        name='firstName'
                        placeholder='Enter Firstname'
                      />
                      <TextField
                        fieldtype='input'
                        label='Password'
                        name='password'
                        type='password'
                        placeholder='Enter Password'
                      />
                      <ButtonSubmit isSubmitting={isSubmitting} />
                      {status && (
                        <div className={"alert alert-danger"}>{status}</div>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className='col-md-6 bg-img-right d-none d-md-block'>
            <div className='card w-75 center-margin'>
              <img
                src={food_img}
                className='card-img-top food_img'
                alt='pizza'
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
