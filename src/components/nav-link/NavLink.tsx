import { type ReactNode } from 'react';
import { Link, useRoute } from 'wouter';

interface Props {
  children?: ReactNode;
  href: string;
}

export function NavLink(props: Props) {
  const [isActive] = useRoute(props.href);

  return (
    <Link {...props}>
      <li className={`dropdown ${isActive ? 'active' : ''}`}>
        {props.children}
      </li>
    </Link>
  );
}
