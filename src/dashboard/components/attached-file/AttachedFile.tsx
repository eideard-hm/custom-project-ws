import { useMemo, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { useDashboardContext } from '../../../hooks';
import type { IAttachFile } from '../../../types/dashboard';
import {
  MAX_SIZE_DOCUMENTS_ALLOW_BYTES,
  MAX_SIZE_MEDIA_ALLOW_BYTES,
} from '../../../utils';

import styles from './AttachedFile.module.css';

type ReadableAttach = IAttachFile & {
  size: number;
};

const MEDIA_MIME_PREFIXES = ['image/', 'video/', 'audio/'];
const DOC_MIME_PREFIXES = ['application/', 'text/'];

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result ?? ''));
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(file);
  });
}

function isMedia(file: File) {
  return MEDIA_MIME_PREFIXES.some((p) => file.type.startsWith(p));
}
function isDocument(file: File) {
  return DOC_MIME_PREFIXES.some((p) => file.type.startsWith(p));
}

function validateFile(file: File) {
  if (isMedia(file)) {
    if (file.size >= MAX_SIZE_MEDIA_ALLOW_BYTES) {
      return {
        ok: false,
        reason: `El archivo "${file.name}" supera 16MB (límite de WhatsApp para fotos/videos/audio).`,
      };
    }
    return { ok: true };
  }
  if (isDocument(file)) {
    if (file.size >= MAX_SIZE_DOCUMENTS_ALLOW_BYTES) {
      return {
        ok: false,
        reason: `El documento "${file.name}" supera 100MB (límite de WhatsApp).`,
      };
    }
    return { ok: true };
  }
  return {
    ok: false,
    reason: `Tipo de archivo no permitido: ${file.type || 'desconocido'}`,
  };
}

export default function AttachedFile() {
  const { attachFile, setAttachFile } = useDashboardContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const filteredFiles = attachFile?.filter((f) => f.base64 && f.name);
  const files = (filteredFiles ?? []) as ReadableAttach[];
  const totalSize = useMemo(
    () => files.reduce((acc, f) => acc + (f.size ?? 0), 0),
    [files]
  );

  const openPicker = () => inputRef.current?.click();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list || list.length === 0) {
      toast.error('No se adjuntó ningún archivo.');
      return;
    }

    const inputs = Array.from(list);
    setBusy(true);

    const validations = inputs.map(validateFile);
    const errors = validations.filter((v) => !v.ok) as Array<{
      reason: string;
    }>;
    if (errors.length) {
      errors.forEach((er) => toast.error(er.reason));
      if (errors.length === inputs.length) {
        setBusy(false);
        if (inputRef.current) inputRef.current.value = '';
        return;
      }
    }

    try {
      const valids = inputs.filter((_, i) => validations[i].ok);
      const results = await Promise.allSettled(
        valids.map(async (f) => ({
          base64: await readAsDataURL(f),
          type: f.type,
          name: f.name,
          size: f.size,
        }))
      );

      const next: ReadableAttach[] = results
        .filter(
          (r): r is PromiseFulfilledResult<ReadableAttach> =>
            r.status === 'fulfilled'
        )
        .map((r) => r.value);

      const rejected = results.filter((r) => r.status === 'rejected');
      if (rejected.length) {
        toast.error(
          `Algunos archivos no se pudieron leer (${rejected.length}).`
        );
      }

      if (next.length === 0) {
        setBusy(false);
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      const merged = [...files, ...next];
      setAttachFile(merged);
      toast.success(`${next.length} archivo(s) agregado(s).`);
    } catch (err) {
      console.error(err);
      toast.error('Ocurrió un error al procesar los archivos.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeAt = (idx: number) => {
    const clone = [...files];
    clone.splice(idx, 1);
    setAttachFile(clone);
  };

  const clearAll = () => {
    setAttachFile([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        type='file'
        multiple
        onChange={onChange}
        className={styles.hiddenInput}
        accept={[
          'image/*',
          'video/*',
          'audio/*',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/plain',
        ].join(',')}
      />

      <button
        type='button'
        className={styles.attachBtn}
        onClick={openPicker}
        disabled={busy}
        aria-busy={busy}
      >
        <i
          className='fa-solid fa-paperclip'
          aria-hidden='true'
        />
        {busy ? ' Procesando…' : ' Adjuntar'}
      </button>

      {files.length > 0 && (
        <div className={styles.files}>
          {files.map((f, i) => (
            <span
              key={`${f.name}-${i}`}
              className={styles.chip}
              title={f.name}
            >
              <i
                className='fa-regular fa-file'
                aria-hidden='true'
              />
              <span className={styles.chipText}>{f.name}</span>
              <button
                type='button'
                className={styles.chipRemove}
                onClick={() => removeAt(i)}
                aria-label={`Quitar ${f.name}`}
              >
                ×
              </button>
            </span>
          ))}

          <button
            type='button'
            className={styles.clearBtn}
            onClick={clearAll}
            aria-label='Quitar todos los archivos'
          >
            Limpiar
          </button>
          <span className={styles.sizeNote}>
            Total: {(totalSize / (1024 * 1024)).toFixed(1)} MB
          </span>
        </div>
      )}
    </div>
  );
}
