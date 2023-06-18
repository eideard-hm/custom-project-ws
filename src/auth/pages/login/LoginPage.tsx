import loginImg from '/public/img/login.jpg';

import './Login.css';

export function LoginPage() {
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
              <div className='page-links'>
                <a
                  href='login1.html'
                  className='active'
                >
                  Login
                </a>
                <a href='register1.html'>Register</a>
              </div>
              <form>
                <input
                  className='form-control'
                  type='text'
                  name='username'
                  placeholder='E-mail Address'
                  required
                />
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  placeholder='Password'
                  required
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
