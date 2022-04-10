import React from "react";
import food_img from "../../assets/images/dude.png";
import productLogo from "../../assets/images/fooddesign.png";

export function Login() {
  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row flex-wrap'>
          <div className='col-md-6 bg-img-left'>
            <div className='card mt-5'>
              <div className='card-header mb-4'>
                <img src={productLogo} alt='product name'></img>
                Product Name
              </div>
              <div className='card-body'>
                <h5 className='card-title mb-5'>Login to Continue</h5>
                <div className='mb-3'>
                  <label for='exampleFormControlInput1' className='form-label'>
                    Username
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='exampleFormControlInput1'
                    placeholder='name@example.com'
                  />
                </div>
                <div className='mb-3'>
                  <label
                    for='exampleFormControlTextarea1'
                    className='form-label'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='exampleFormControlInput1'
                    placeholder='name@example.com'
                  />
                </div>
                <div className='mt-5 '>
                  <button
                    type='submit'
                    className='form-control form-control-sm submit'
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6 bg-img-right d-none d-md-block'>
            <div className='card w-75 center-margin'>
              <img src={food_img} class='card-img-top food_img' alt='food' />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
