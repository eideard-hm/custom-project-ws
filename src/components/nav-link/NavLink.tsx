import { type ReactNode } from 'react';

import { Link } from '@reach/router';

interface Props {
  children?: ReactNode;
  to: string;
  className: string;
}

export const NavLink = ({ className, to, children }: Props) => (
  <Link
    to={to}
    className={className}
  >
    {children}
  </Link>
);

// export const NavLink = ({ className, to, children }: Props) => (
//   <Match path={`${to}/*`}>
//     {({ match }) => (
//       <li className={`dropdown ${match ? 'active' : ''}`}>
//         <Link
//           to={to}
//           className={className}
//         >
//           {children}
//         </Link>
//       </li>
//     )}
//   </Match>
// );
