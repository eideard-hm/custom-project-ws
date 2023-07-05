import userImage from '../../../assets/img/user.png';

export function Sidebar() {
  return (
    <div className='main-sidebar sidebar-style-2'>
      <aside id='sidebar-wrapper'>
        <div className='sidebar-brand'>
          <a href='#'>
            <img
              alt='image'
              src={userImage}
              className='header-logo'
            />
            <span className='logo-name'>Otika</span>
          </a>
        </div>
        <ul className='sidebar-menu'>
          <li className='menu-header'>Main</li>
          <li className='dropdown active'>
            <a
              href='index.html'
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
            <ul className='dropdown-menu'>
              <li>
                <a
                  className='nav-link'
                  href='widget-chart.html'
                >
                  Chart Widgets
                </a>
              </li>
              <li>
                <a
                  className='nav-link'
                  href='widget-data.html'
                >
                  Data Widgets
                </a>
              </li>
            </ul>
          </li>
          <li className='dropdown'>
            <a
              href='#'
              className='menu-toggle nav-link has-dropdown'
            >
              <i data-feather='command'></i>
              <span>Apps</span>
            </a>
            <ul className='dropdown-menu'>
              <li>
                <a
                  className='nav-link'
                  href='chat.html'
                >
                  Chat
                </a>
              </li>
              <li>
                <a
                  className='nav-link'
                  href='portfolio.html'
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  className='nav-link'
                  href='blog.html'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className='nav-link'
                  href='calendar.html'
                >
                  Calendar
                </a>
              </li>
            </ul>
          </li>
          <li className='dropdown'>
            <a
              href='#'
              className='menu-toggle nav-link has-dropdown'
            >
              <i data-feather='mail'></i>
              <span>Email</span>
            </a>
            <ul className='dropdown-menu'>
              <li>
                <a
                  className='nav-link'
                  href='email-inbox.html'
                >
                  Inbox
                </a>
              </li>
              <li>
                <a
                  className='nav-link'
                  href='email-compose.html'
                >
                  Compose
                </a>
              </li>
              <li>
                <a
                  className='nav-link'
                  href='email-read.html'
                >
                  read
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
}
