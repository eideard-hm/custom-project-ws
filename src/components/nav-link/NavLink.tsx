import { type ReactNode } from 'react';

import { Link } from '@reach/router';

interface Props {
  children?: ReactNode;
  to: string;
  className: string;
}

export const NavLink = (props: Props) => (
  <li className={`dropdown`}>
    <Link {...props} />
  </li>
);
