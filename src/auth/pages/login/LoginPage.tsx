import { useFormik } from 'formik';

import loginImg from '/public/img/login.jpg';

import './Login.css';
import type { IFormValues } from '../../types';

export default function LoginPage() {
  const submitForm = (values: IFormValues) => {
    console.log({ values })
  }

  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: submitForm,
  });

  return (
    <div
      className='form-body container-fluid'
      id='form-login'
    >
      <div className='row'>
        <div className='img-holder'>
          <div className='bg'>
            <img
              src={loginImg}
              alt='Imagen del login'
            />
          </div>
          <div className='info-holder'></div>
        </div>
        <div className='form-holder'>
          <div className='form-content'>
            <div className='form-items'>
              <h3>Get more things done with Loggin platform.</h3>
              <p>
                Access to the most powerfull tool in the entire design and web
                industry.
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  className='form-control'
                  type='email'
                  name='email'
                  placeholder='example@example.com'
                  required
                  onChange={handleChange}
                />
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  placeholder='Contraseña'
                  required
                  onChange={handleChange}
                />
                <div className='form-button'>
                  <button
                    id='submit'
                    type='submit'
                    className='ibtn'
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
