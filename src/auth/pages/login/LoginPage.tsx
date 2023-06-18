import { useFormik } from 'formik';

import type { IFormValues } from '../../types';
import { schema } from '../../validators';
import './Login.css';
import loginImg from '/public/img/login.jpg';

export default function LoginPage() {
  const submitForm = (values: IFormValues) => {
    console.log({ values });
  };

  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: submitForm,
    validationSchema: schema,
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
                  name='email'
                  placeholder='example@example.com'
                  onChange={handleChange}
                />
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  placeholder='Contraseña'
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

              <br />
              {errors.email && <span>Email inválido</span>}
              <br />
              {errors.password && <span>Contraseña inválido</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
