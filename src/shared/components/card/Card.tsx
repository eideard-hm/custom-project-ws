import { ReactNode } from 'react';

import './Card.css';

interface Props {
  children?: ReactNode;
}

export function Card({ children, ...props }: Props) {
  return (
    <div
      className='card'
      {...props}
    >
      <div className='card-statistic-4'>
        <div className='row align-items-center justify-content-between'>
          {children}
        </div>
      </div>
    </div>
  );
}
