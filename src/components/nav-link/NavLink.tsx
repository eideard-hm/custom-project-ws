import { type ReactNode } from 'react';

import { Link, Match } from '@reach/router';

interface Props {
  children?: ReactNode;
  to: string;
  className: string;
}

export const NavLink = (props: Props) => (
  <Match path={`${props.to}/*`}>
    {({ match }) => (
      <li className={`dropdown ${match ? 'active' : ''}`}>
        <Link {...props} />
      </li>
    )}
  </Match>
);
