import { type ReactNode } from 'react';

import { Link } from '@reach/router';

interface Props {
  children?: ReactNode;
  to: string;
  className: string;
}

export const NavLink = ({ className, to, children }: Props) => (
  <li className={`dropdown`}>
    <Link
      to={to}
      className={className}
    >
      {children}
    </Link>
  </li>
);
