import { useEffect, useMemo, useState } from 'react';

import type { IUserDataLogin } from '../../../auth/types';
import { API_URL } from '../../../config';
import { getSessionStorageOrNavigate } from '../../../services';
import styles from './WeeklyReportPage.module.css';
import { KpiCard } from './components/KpiCard';
import { ReportTable } from './components/ReportTable';
import type { WeeklyReportResponse } from './types';

function yyyyMmDd(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfWeekMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(d: Date, days: number) {
  const date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
}

function formatNumber(n: number) {
  return new Intl.NumberFormat('es-CO').format(n);
}

export default function WeeklyReportPage() {
  const now = new Date();
  const monday = startOfWeekMonday(now);
  const sunday = addDays(monday, 6);

  const [from, setFrom] = useState<string>(yyyyMmDd(monday));
  const [to, setTo] = useState<string>(yyyyMmDd(sunday));

  const [data, setData] = useState<WeeklyReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const query = useMemo(() => {
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);

    const params = new URLSearchParams();
    params.set('from', from);
    params.set('to', to);
    params.set('userId', userId);
    params.set('byUser', 'true');
    return params.toString();
  }, [from, to]);

  async function fetchReport() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/reports/weekly?${query}`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const json = (await res.json()) as WeeklyReportResponse;
      setData(json);
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totals = data?.summary.totals;

  return (
    <section className={styles.page}>
      <header className={styles.topbar}>
        <div>
          <h1 className={styles.h1}>Reportes</h1>
          <p className={styles.sub}>
            Estadísticas básicas basadas en registros de envíos (Send).
          </p>
        </div>

        <button
          className={styles.primaryBtn}
          onClick={fetchReport}
          disabled={loading}
        >
          {loading ? 'Cargando…' : 'Actualizar'}
        </button>
      </header>

      <section className={styles.filters}>
        <div className={styles.field}>
          <label className={styles.label}>Desde</label>
          <input
            className={styles.input}
            type='date'
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            max={to}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Hasta</label>
          <input
            className={styles.input}
            type='date'
            value={to}
            onChange={(e) => setTo(e.target.value)}
            min={from}
          />
        </div>

        <div className={styles.spacer} />

        <div className={styles.muted}>
          {data?.summary.range
            ? `Rango: ${data.summary.range.from.slice(0, 10)} → ${data.summary.range.to.slice(0, 10)}`
            : null}
        </div>
      </section>

      {error ? (
        <div className={styles.alert}>
          <div className={styles.alertTitle}>No se pudo cargar el reporte</div>
          <div className={styles.alertText}>{error}</div>
        </div>
      ) : null}

      <section className={styles.kpis}>
        <KpiCard
          label='Campañas / envíos'
          value={totals ? formatNumber(totals.campaigns) : '—'}
        />
        <KpiCard
          label='Mensajes enviados'
          value={totals ? formatNumber(totals.messagesSent) : '—'}
        />
        <KpiCard
          label='Prom. mensajes por envío'
          value={totals ? totals.avgMessagesPerSend.toFixed(1) : '—'}
        />
        <KpiCard
          label='Envíos con adjuntos'
          value={totals ? formatNumber(totals.sendsWithAttachments) : '—'}
        />
        <KpiCard
          label='Grupos contactados'
          value='—'
          hint='Disponible en fase 2'
        />
        <KpiCard
          label='Respuestas'
          value='—'
          hint='Disponible en fase 2'
        />
      </section>

      <section className={styles.grid}>
        <ReportTable
          title='Actividad por día'
          rows={data?.byDay ?? []}
          columns={[
            { key: 'date', header: 'Fecha', render: (r) => r.date },
            {
              key: 'campaigns',
              header: 'Campañas',
              align: 'right',
              render: (r) => formatNumber(r.campaigns),
            },
            {
              key: 'messages',
              header: 'Mensajes',
              align: 'right',
              render: (r) => formatNumber(r.messagesSent),
            },
            {
              key: 'attach',
              header: 'Adjuntos',
              align: 'right',
              render: (r) => formatNumber(r.sendsWithAttachments),
            },
          ]}
          emptyText={loading ? 'Cargando…' : 'No hay registros en este rango.'}
        />
      </section>
    </section>
  );
}
