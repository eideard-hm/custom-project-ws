import { useEffect } from 'react';

import { NavLink } from '../../../components';
import { links } from '../../../data';
import { useAuthContext } from '../../../hooks';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { UserProfile } from '../user-profile/UserProfile';

export function Sidebar() {
  const {
    auth: { isLoggin },
  } = useAuthContext();
  const isMobile = useMediaQuery('(max-width: 992px)');

  useEffect(() => {
    if (!isMobile) {
      document.body.classList.remove('sidebar-gone');
      document.body.classList.remove('sidebar-show');
      return;
    };

    const handleBodyClick = (e: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar');
      const navbar = document.querySelector('nav');

      if (
        sidebar?.contains(e.target as Node) ||
        navbar?.contains(e.target as Node)
      ) {
        return;
      }

      document.body.classList.add('sidebar-gone');
      document.body.classList.remove('sidebar-show');
    };

    document.body.addEventListener('click', handleBodyClick);
    return () => document.body.removeEventListener('click', handleBodyClick);
  }, [isMobile]);

  return (
    <div className='main-sidebar sidebar-style-2'>
      <aside id='sidebar-wrapper'>
        <UserProfile />

        <ul className='sidebar-menu'>
          <li className='menu-header'>Main</li>
          {links.map(({ href, label, icon, disabled }, i) => (
            <NavLink
              href={href}
              key={i}
            >
              <a
                className={`nav-link ${
                  (disabled && isLoggin) || (!disabled && !isLoggin)
                    ? 'disabled'
                    : ''
                }`}
              >
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
