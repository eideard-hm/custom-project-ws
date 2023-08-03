import { useContext, useRef } from 'react';

import { navigate } from '@reach/router';

import { AuthContext } from '../../../context';
import { logout } from '../../../services';
import { UserImage } from '../user-img/UserImage';

export function Nabvar() {
  const {
    auth: { isLoggin },
    userData: { fullName },
  } = useContext(AuthContext);
  const userDropdown = useRef<HTMLDivElement>(null);

  const handleUserDropdown = () => {
    userDropdown.current?.classList.toggle('show');
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/auth/login', { replace: true });
    if (isLoggin) await logout();
  };

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
          </li>
          <li
            className='dropdown'
            onClick={handleUserDropdown}
          >
            <a
              data-toggle='dropdown'
              className='nav-link dropdown-toggle nav-link-lg nav-link-user'
            >
              <UserImage />
              <span className='d-sm-none d-lg-inline-block'></span>
            </a>
            <div
              ref={userDropdown}
              className='dropdown-menu dropdown-menu-right pullDown'
            >
              <div className='dropdown-title'>Hola {fullName}</div>
              <a
                href='#'
                className='dropdown-item has-icon'
              >
                <i
                  className='far
										fa-user'
                ></i>
                Profile
              </a>
              <a
                href='#'
                className='dropdown-item has-icon'
              >
                <i className='fas fa-bolt'></i>
                Activities
              </a>
              <a
                href='#'
                className='dropdown-item has-icon'
              >
                <i className='fas fa-cog'></i>
                Settings
              </a>
              <div className='dropdown-divider'></div>
              <a
                onClick={handleLogout}
                className='dropdown-item has-icon text-danger'
              >
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
