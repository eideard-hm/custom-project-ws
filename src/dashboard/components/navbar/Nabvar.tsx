import { useRef } from 'react';

import { useAuthContext } from '../../../hooks';
import { destroySession } from '../../../services';
import { UserImage } from '../user-img/UserImage';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

import cls from './Nabvar.module.css';

export function Nabvar() {
  const {
    auth: { isLoggin },
    userData: { fullName },
  } = useAuthContext();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const userDropdown = useRef<HTMLDivElement>(null);

  const handleUserDropdown = () => {
    userDropdown.current?.classList.toggle(cls.show);
  };

  const handleLogout = async () => {
    await destroySession(isLoggin);
  };

  const handleToggleSidebar = () => {
    if (isMobile) {
      document.body.classList.toggle('sidebar-show');
      document.body.classList.remove('sidebar-gone');
      document.body.classList.remove('sidebar-mini');
    } else {
      document.body.classList.toggle('sidebar-mini');
      document.body.classList.remove('sidebar-show');
    }
  };

  return (
    <>
      <div className={cls.navbarBg}></div>
      <nav
        className={`${cls.themePurple} navbar navbar-expand-lg main-navbar sticky`}
      >
        <div className='form-inline mr-auto'>
          <ul className='navbar-nav mr-3'>
            <li>
              <a
                onClick={handleToggleSidebar}
                href='#'
                className='nav-link nav-link-lg collapse-btn'
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
                className={`feather feather-bell ${cls.bell}`}
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
              className={`${cls.dropdownMenu} dropdown-menu dropdown-menu-right pullDown`}
            >
              <div className={cls.dropdownTitle}>Hola {fullName}</div>
              <a
                href='#'
                className={cls.dropdownItem}
              >
                <i className='far fa-user'></i> Profile
              </a>
              <a
                href='#'
                className={cls.dropdownItem}
              >
                <i className='fas fa-bolt'></i> Activities
              </a>
              <a
                href='#'
                className={cls.dropdownItem}
              >
                <i className='fas fa-cog'></i> Settings
              </a>
              <div className={cls.dropdownDivider}></div>
              <a
                onClick={handleLogout}
                href='#'
                className={`${cls.dropdownItem} ${cls.textDanger}`}
              >
                <i className='fas fa-sign-out-alt'></i> Cerrar Sesión
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
