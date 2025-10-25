import { memo, useMemo } from 'react';

import styles from './PreviewPanel.module.css';

type Props = {
  rawMessage: string;
  parsedMessage: string;
  recipientsCount: number;
  attachmentsCount: number;
};

const renderTemplate = (m: string) =>
  m
    .replace(/{name}/gi, '*Nombre Apellido*')
    .replace(/{user}/gi, '*Tu Nombre*')
    .replace(/{location}/gi, '*Tu Ciudad*');

function PreviewPanel({
  rawMessage,
  parsedMessage,
  recipientsCount,
  attachmentsCount,
}: Props) {
  const preview = useMemo(() => renderTemplate(parsedMessage || ''), [parsedMessage]);
  const okName = rawMessage.toLowerCase().includes('{name}');
  const okUser = rawMessage.toLowerCase().includes('{user}');
  const okLoc = rawMessage.toLowerCase().includes('{location}');

  return (
    <aside className={styles.aside}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.title}>Vista previa</span>
          <span className={styles.counter}>{parsedMessage.length} caracteres</span>
        </div>

        <div className={styles.body}>
          <div className={styles.bubbleWrap}>
            <div className={styles.bubble}>
              <span className={styles.message}>
                {preview || 'Escribe tu mensaje…'}
              </span>
            </div>
          </div>

          <div className={styles.badges}>
            <span
              className={`${styles.badge} ${
                okName ? styles.badgeOk : styles.badgeMuted
              }`}
            >
              {'{name}'}
            </span>

            <span
              className={`${styles.badge} ${
                okUser ? styles.badgeOk : styles.badgeMuted
              }`}
            >
              {'{user}'}
            </span>
            <span
              className={`${styles.badge} ${
                okLoc ? styles.badgeOk : styles.badgeMuted
              }`}
            >
              {'{location}'}
            </span>
            <span className={`${styles.badge} ${styles.badgeInfo}`}>
              Destinatarios: {recipientsCount}
            </span>

            <span className={`${styles.badge} ${styles.badgeInfo}`}>
              Adjuntos: {attachmentsCount}
            </span>
          </div>

          {(!okName || !okUser || !okLoc) && (
            <p className={styles.warn}>
              Recuerda incluir {!okName && (<code>{'{name}'}</code>)} {!okUser && (<code>{'{user}'}</code>)} y {!okLoc && (<code>{'{location}'}</code>)} para poder enviar.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

export default memo(PreviewPanel);
