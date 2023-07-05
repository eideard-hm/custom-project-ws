import { ASSETS_IMAGES } from '../../../assets/img';

export function Nabvar() {
  return (
    <>
      <div className='navbar-bg'></div>
      <nav className='navbar navbar-expand-lg main-navbar sticky'>
        <div className='form-inline mr-auto'>
          <ul className='navbar-nav mr-3'>
            <li>
              <a
                href='#'
                data-toggle='sidebar'
                className='nav-link nav-link-lg
									collapse-btn'
              >
                {' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-align-justify'
                >
                  <line
                    x1='21'
                    y1='10'
                    x2='3'
                    y2='10'
                  ></line>
                  <line
                    x1='21'
                    y1='6'
                    x2='3'
                    y2='6'
                  ></line>
                  <line
                    x1='21'
                    y1='14'
                    x2='3'
                    y2='14'
                  ></line>
                  <line
                    x1='21'
                    y1='18'
                    x2='3'
                    y2='18'
                  ></line>
                </svg>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='nav-link nav-link-lg fullscreen-btn'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-maximize'
                >
                  <path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <ul className='navbar-nav navbar-right'>
          <li className='dropdown dropdown-list-toggle'>
            <a
              href='#'
              data-toggle='dropdown'
              className='nav-link notification-toggle nav-link-lg'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-bell bell'
              >
                <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'></path>
                <path d='M13.73 21a2 2 0 0 1-3.46 0'></path>
              </svg>
            </a>
            <div className='dropdown-menu dropdown-list dropdown-menu-right pullDown'>
              <div className='dropdown-header'>
                Notifications
                <div className='float-right'>
                  <a href='#'>Mark All As Read</a>
                </div>
              </div>
              <div className='dropdown-list-content dropdown-list-icons'>
                <a
                  href='#'
                  className='dropdown-item dropdown-item-unread'
                >
                  {' '}
                  <span className='dropdown-item-icon bg-primary text-white'>
                    {' '}
                    <i
                      className='fas
												fa-code'
                    ></i>
                  </span>{' '}
                  <span className='dropdown-item-desc'>
                    {' '}
                    Template update is available now!{' '}
                    <span className='time'>2 Min Ago</span>
                  </span>
                </a>{' '}
                <a
                  href='#'
                  className='dropdown-item'
                >
                  {' '}
                  <span className='dropdown-item-icon bg-info text-white'>
                    {' '}
                    <i
                      className='far
												fa-user'
                    ></i>
                  </span>{' '}
                  <span className='dropdown-item-desc'>
                    {' '}
                    <b>You</b> and <b>Dedik Sugiharto</b> are now friends{' '}
                    <span className='time'>10 Hours Ago</span>
                  </span>
                </a>{' '}
                <a
                  href='#'
                  className='dropdown-item'
                >
                  {' '}
                  <span className='dropdown-item-icon bg-success text-white'>
                    {' '}
                    <i
                      className='fas
												fa-check'
                    ></i>
                  </span>{' '}
                  <span className='dropdown-item-desc'>
                    {' '}
                    <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to{' '}
                    <b>Done</b> <span className='time'>12 Hours Ago</span>
                  </span>
                </a>{' '}
                <a
                  href='#'
                  className='dropdown-item'
                >
                  {' '}
                  <span className='dropdown-item-icon bg-danger text-white'>
                    {' '}
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>{' '}
                  <span className='dropdown-item-desc'>
                    {' '}
                    Low disk space. Let's clean it!{' '}
                    <span className='time'>17 Hours Ago</span>
                  </span>
                </a>{' '}
                <a
                  href='#'
                  className='dropdown-item'
                >
                  {' '}
                  <span className='dropdown-item-icon bg-info text-white'>
                    {' '}
                    <i
                      className='fas
												fa-bell'
                    ></i>
                  </span>{' '}
                  <span className='dropdown-item-desc'>
                    {' '}
                    Welcome to Otika template!{' '}
                    <span className='time'>Yesterday</span>
                  </span>
                </a>
              </div>
              <div className='dropdown-footer text-center'>
                <a href='#'>
                  View All <i className='fas fa-chevron-right'></i>
                </a>
              </div>
            </div>
          </li>
          <li className='dropdown'>
            <a
              href='#'
              data-toggle='dropdown'
              className='nav-link dropdown-toggle nav-link-lg nav-link-user'
            >
              {' '}
              <img
                alt='image'
                src={ASSETS_IMAGES.user}
                className='user-img-radious-style'
              />{' '}
              <span className='d-sm-none d-lg-inline-block'></span>
            </a>
            <div className='dropdown-menu dropdown-menu-right pullDown'>
              <div className='dropdown-title'>Hello Sarah Smith</div>
              <a
                href='profile.html'
                className='dropdown-item has-icon'
              >
                {' '}
                <i
                  className='far
										fa-user'
                ></i>{' '}
                Profile
              </a>{' '}
              <a
                href='timeline.html'
                className='dropdown-item has-icon'
              >
                {' '}
                <i className='fas fa-bolt'></i>
                Activities
              </a>{' '}
              <a
                href='#'
                className='dropdown-item has-icon'
              >
                {' '}
                <i className='fas fa-cog'></i>
                Settings
              </a>
              <div className='dropdown-divider'></div>
              <a
                href='auth-login.html'
                className='dropdown-item has-icon text-danger'
              >
                {' '}
                <i className='fas fa-sign-out-alt'></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
