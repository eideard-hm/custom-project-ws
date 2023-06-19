import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import loginImg from '../../../assets/img/login.jpg';
import { loginUser } from '../../services';
import type { IFormValues } from '../../types';
import { schema } from '../../validators';
import './Login.css';

export default function LoginPage() {
  const submitForm = async (values: IFormValues) => {
    if (!isValid) return;

    const { login } = await loginUser(values);
    console.log({ login });
    if (!login) {
      toast.error('Correo contraseña inválidos. Intente, nuevamente.', {
        style: { zIndex: 1000 },
      });
      resetForm();
    } else {
      // redict to the dashboard
    }
  };

  const { handleChange, handleSubmit, errors, isValid, resetForm, values } =
    useFormik({
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
                  value={values.email}
                />
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  placeholder='Contraseña'
                  onChange={handleChange}
                  value={values.password}
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
