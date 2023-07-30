import { useContext } from 'react';

import { AuthContext } from '../../../context';
import { DefaultImage } from '../../../shared/components';

export function Sidebar() {
  const {
    userData: { fullName, userImage },
  } = useContext(AuthContext);
  return (
    <div className='main-sidebar sidebar-style-2'>
      <aside id='sidebar-wrapper'>
        <div className='sidebar-brand'>
          <a href='#'>
            {userImage ? (
              <img
                alt={`Imagen de perfil ${fullName}`}
                src={userImage}
                className='header-logo'
              />
            ) : (
              <DefaultImage />
            )}
            <span className='logo-name'>{fullName}</span>
          </a>
        </div>
        <ul className='sidebar-menu'>
          <li className='menu-header'>Main</li>
          <li className='dropdown active'>
            <a
              href='#'
              className='nav-link'
            >
              <i data-feather='monitor'></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className='dropdown'>
            <a
              href='#'
              className='menu-toggle nav-link has-dropdown'
            >
              <i data-feather='briefcase'></i>
              <span>Widgets</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
