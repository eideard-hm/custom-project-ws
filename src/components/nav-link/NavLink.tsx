import { useState, type ReactNode } from 'react';

import { Link } from '@reach/router';

interface Props {
  children?: ReactNode;
  to: string;
  className: string;
}

export function NavLink(props: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <li className={`dropdown  ${isActive ? 'active' : ''}`}>
      <Link
        {...props}
        getProps={({ isCurrent }) => {
          setIsActive(isCurrent);
          return false;
        }}
      >
        {props.children}
      </Link>
    </li>
  );
}
