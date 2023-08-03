import { type ReactNode } from 'react';

import { Link } from '@reach/router';

interface Props {
  children?: ReactNode;
  to: string;
  className: string;
}

export function NavLink(props: Props) {
  return <Link {...props}>{props.children}</Link>;
}
