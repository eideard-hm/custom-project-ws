import { type MouseEvent } from 'react';

import { navigate } from '@reach/router';

import { links } from '../../../data';
import { useAuthContext } from '../../../hooks';
import { UserProfile } from '../user-profile/UserProfile';

export function Sidebar() {
  const {
    auth: { isLoggin },
  } = useAuthContext();

  const handleNavigate = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await navigate(e.currentTarget.href);
  };

  return (
    <div className='main-sidebar sidebar-style-2'>
      <aside id='sidebar-wrapper'>
        <UserProfile />

        <ul className='sidebar-menu'>
          <li className='menu-header'>Main</li>
          {links.map(({ href, label, icon, disabled }, i) => (
            <li
              className='dropdown'
              key={i}
            >
              <a
                href={href}
                onClick={handleNavigate}
                className={`nav-link ${
                  (disabled && isLoggin) || (!disabled && !isLoggin)
                    ? 'disabled'
                    : ''
                }`}
              >
                <i className={icon}></i>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
