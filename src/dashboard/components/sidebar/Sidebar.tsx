import { NavLink } from '../../../components';
import { links } from '../../../data';
import { useAuthContext } from '../../../hooks';
import { UserProfile } from '../user-profile/UserProfile';

export function Sidebar() {
  const {
    auth: { isLoggin },
  } = useAuthContext();

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
