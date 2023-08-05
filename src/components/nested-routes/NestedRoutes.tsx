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

  // don't render anything outside of the scope
  if (!parentLocation.startsWith(nestedBase)) return null;

  // we need key to make sure the router will remount when base changed
  return (
    <Router
      base={nestedBase}
      key={nestedBase}
    >
      {children}
    </Router>
  );
}
