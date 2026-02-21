import styles from './ReportTable.module.css';

type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
};

type Props<T> = {
  title: string;
  columns: Column<T>[];
  rows: T[];
  emptyText?: string;
};

export function ReportTable<T>({ title, columns, rows, emptyText }: Props<T>) {
  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.count}>{rows.length} filas</div>
      </header>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={styles.th}
                  style={{ textAlign: c.align ?? 'left' }}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  className={styles.empty}
                  colSpan={columns.length}
                >
                  {emptyText ?? 'Sin datos para mostrar.'}
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={styles.tr}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={styles.td}
                      style={{ textAlign: c.align ?? 'left' }}
                    >
                      {c.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
