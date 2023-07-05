import { ReactNode } from 'react';

import { WsOptions } from '../../../ws/components';

interface Props {
  children?: ReactNode;
}

export function Card({ children, ...props }: Props) {
  return (
    <div className='col-12' {...props}>
      <div className='card'>
        <div className='card-statistic-4'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3'>
              <div className='card-content'>
                <WsOptions />
              </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0'>
              <div className='banner-img'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
