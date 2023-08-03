import { NavLink } from '../../../components';
import { links } from '../../../data';
import { useDashboardContext } from '../../../hooks';
import { UserProfile } from '../user-profile/UserProfile';

export function Sidebar() {
  const {
    loginInfo: { loginSuccess },
  } = useDashboardContext();

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
              <NavLink
                to={href}
                className={`nav-link ${
                  disabled && loginSuccess ? 'disabled' : ''
                }`}
              >
                <i className={icon}></i>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
