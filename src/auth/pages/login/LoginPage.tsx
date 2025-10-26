import { useState } from 'react';

import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { navigate } from 'wouter/use-location';

import { ASSETS_IMAGES } from '../../../assets/img';
import { useAuthContext } from '../../../hooks';
import { setSessionStorage } from '../../../services';
import { USER_ID_KEY } from '../../../utils';
import { loginUser } from '../../services';
import type { IFormValues } from '../../types';
import { schema } from '../../validators';

import './LoginPage.css';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { userData: userDataProvider, setUserData } = useAuthContext();

  const submitForm = async (values: IFormValues) => {
    if (!isValid) return;

    setIsLoading(true);
    const { loginSuccess, userData } = await loginUser(values);
    console.log({ loginSuccess });
    if (!loginSuccess) {
      toast.error('Correo contraseña inválidos. Intente, nuevamente.', {
        style: { zIndex: 1000 },
      });
    } else {
      // guardar el Id en el session storage
      setSessionStorage({ key: USER_ID_KEY, value: JSON.stringify(userData) });
      // guardar la data del usuario
      setUserData({
        ...userDataProvider,
        fullName: userData.fullName,
        town: userData.town,
      });
      // redirect to the dashboard
      navigate('/dashboard', { replace: true });
    }
    setIsLoading(false);
  };

  const { handleChange, handleSubmit, errors, isValid } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: submitForm,
    validationSchema: schema,
  });

  return (
    <section id='form-login'>
      <div className='form-body container-fluid'>
        <div className='row'>
          <div className='img-holder'>
            <div className='bg'>
              <img
                src={ASSETS_IMAGES.login}
                alt='Imagen del login'
              />
            </div>
            <div className='info-holder'></div>
          </div>
          <div className='form-holder'>
            <div className='form-content'>
              <div className='form-items'>
                <h3>Iniciar sesión en <strong>VoxNet</strong></h3>
                <p>Bienvenido/a a <strong>VoxNet</strong>, es un placer tenerlos en línea.</p>
                <form onSubmit={handleSubmit}>
                  <input
                    className='form-control'
                    name='email'
                    placeholder='example@example.com'
                    onChange={handleChange}
                    autoFocus={true}
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
                      type='submit'
                      className='btn'
                      disabled={isLoading}
                    >
                      Iniciar Sessión
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
    </section>
  );
}
