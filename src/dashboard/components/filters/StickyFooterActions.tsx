import { memo, type PropsWithChildren } from 'react';

import styles from './StickyFooterActions.module.css';

type Props = PropsWithChildren<{
  isSubmitting: boolean;
  disabled: boolean;
  onSubmit: (e?: any) => void;
  wsSessionStatus: string;
}>;

function StickyFooterActions({
  isSubmitting,
  disabled,
  onSubmit,
  wsSessionStatus,
  children,
}: Props) {
  return (
    <div
      className={styles.footer}
      role='region'
      aria-label='Acciones de envío'
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          {children}
          <span className={styles.status}>{wsSessionStatus}</span>
        </div>

        <button
          type='button'
          className={`${styles.cta} ${disabled ? styles.ctaDisabled : ''}`}
          onClick={() => onSubmit()}
          disabled={disabled}
          aria-disabled={disabled}
          aria-busy={isSubmitting}
        >
          <i
            className='fa-solid fa-paper-plane'
            style={{ marginRight: 8 }}
          />
          Enviar Mensaje
        </button>
      </div>
    </div>
  );
}

export default memo(StickyFooterActions);
