import styles from './KpiCard.module.css';

type Props = {
  label: string;
  value: React.ReactNode;
  hint?: string;
};

export function KpiCard({ label, value, hint }: Props) {
  return (
    <section className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {hint ? <div className={styles.hint}>{hint}</div> : null}
    </section>
  );
}
