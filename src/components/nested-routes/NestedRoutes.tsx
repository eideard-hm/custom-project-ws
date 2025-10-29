import { type ReactNode } from 'react';
import { Router, useLocation, useRouter } from 'wouter';

interface Props {
  base: string;
  children?: ReactNode;
}

export function NestedRoutes({ base, children }: Props) {
  const router = useRouter();
  const [parentLocation] = useLocation();

  const nestedBase = `${router.base}${base}`;

  if (!parentLocation.startsWith(nestedBase)) return null;
  return (
    <Router
      base={nestedBase}
      key={nestedBase}
    >
      {children}
    </Router>
  );
}
