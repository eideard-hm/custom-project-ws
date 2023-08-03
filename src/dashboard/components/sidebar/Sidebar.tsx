import { useContext } from 'react';

import { NavLink } from '../../../components';
import { AuthContext } from '../../../context';
import { links } from '../../../data';
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
          {links.map(({ href, label, icon }, i) => (
            <NavLink
              href={href}
              key={i}
            >
              <a className='nav-link'>
                <i className={icon}></i>
                <span>{label}</span>
              </a>
            </NavLink>
          ))}
        </ul>
      </aside>
    </div>
  );
}
