import { useState } from 'react';

import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { navigate } from 'wouter/use-location';

import { ASSETS_IMAGES } from '../../../assets/img';
import { useAuthContext } from '../../../hooks';
import { setSessionStorage } from '../../../services';
import { VoxNetLogo } from '../../../shared/components/logo/VoxNetLogo';
import { USER_ID_KEY } from '../../../utils';
import { loginUser } from '../../services';
import type { IFormValues } from '../../types';
import { schema } from '../../validators';

import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { userData: userDataProvider, setUserData } = useAuthContext();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
    values,
    setSubmitting,
  } = useFormik<IFormValues>({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      if (!isValid || isLoading) return;
      setIsLoading(true);
      try {
        const { loginSuccess, userData } = await loginUser(formValues);

        if (!loginSuccess || !userData) {
          toast.error('Correo o contraseña inválidos. Intenta nuevamente.', { style: { zIndex: 1000 } });
          return;
        }

        setSessionStorage({ key: USER_ID_KEY, value: JSON.stringify(userData) });
        setUserData({
          ...userDataProvider,
          fullName: userData.fullName,
          town: userData.town,
        });
        navigate('/dashboard', { replace: true });
      } catch (err) {
        toast.error('Ocurrió un error al iniciar sesión. Intenta de nuevo.');
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <section id="form-login" className={styles.formLogin}>
      <div className={styles.formBody}>
        <div className={styles.imgHolder} aria-hidden="true">
          <div className={styles.bg}>
            <img src={ASSETS_IMAGES.login} alt="Imagen de inicio de sesión" />
          </div>
          <div className={styles.infoHolder} />
        </div>

        <div className={styles.formHolder}>
          <div className={styles.formContent}>
            <div className={styles.formItems}>
              <header className={styles.logoWrapper}>
                <VoxNetLogo size={100} className={styles.logoSpacing} />
              </header>

              <h3 className={styles.title}>
                Iniciar sesión en <strong>VoxNet</strong>
              </h3>
              <p className={styles.subtitle}>
                Bienvenido/a a <strong>VoxNet</strong>, es un placer tenerte en línea.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="example@example.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="email"
                  autoFocus
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                />
                {touched.email && errors.email && (
                  <span id="email-error" className={styles.errorMsg}>Email inválido</span>
                )}

                <label htmlFor="password" className={styles.label}>Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={styles.input}
                  placeholder="Contraseña"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                  aria-invalid={!!(touched.password && errors.password)}
                  aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
                />
                {touched.password && errors.password && (
                  <span id="password-error" className={styles.errorMsg}>Contraseña inválida</span>
                )}

                <div className={styles.formButton}>
                  <button
                    type="submit"
                    className={styles.btn}
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading ? 'Ingresando…' : 'Iniciar sesión'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
