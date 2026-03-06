import { useMemo, useState } from 'react';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

import styles from './SearchableSelect.module.css';

type Option = {
  value: string;
  label: string;
};

type SearchableSelectProps = {
  name: string;
  value?: string | null;
  options: Option[];
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
};

export function SearchableSelect({
  name,
  value,
  options,
  placeholder = 'Buscar...',
  emptyText = 'No se encontraron resultados',
  disabled = false,
  onChange,
}: SearchableSelectProps) {
  const [query, setQuery] = useState('');

  const currentValue = value ?? '';

  const selectedOption = useMemo(
    () => options.find((option) => option.value === currentValue) ?? null,
    [options, currentValue],
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedQuery),
    );
  }, [options, query]);

  return (
    <div className={styles.wrapper}>
      <Combobox
        value={selectedOption}
        onChange={(option: Option | null) => {
          onChange(name, option?.value ?? '');
          setQuery('');
        }}
        disabled={disabled}
      >
        <div className={styles.control}>
          <ComboboxInput
            className={styles.input}
            displayValue={(option: Option | null) => option?.label ?? ''}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            autoComplete='off'
          />

          <ComboboxButton
            className={styles.button}
            aria-label='Mostrar opciones'
          >
            ▼
          </ComboboxButton>

          <ComboboxOptions className={styles.options}>
            {filteredOptions.length === 0 ? (
              <li className={styles.empty}>{emptyText}</li>
            ) : (
              filteredOptions.map((option) => (
                <ComboboxOption
                  key={option.value}
                  value={option}
                  className={({ active, selected }) =>
                    [
                      styles.option,
                      active ? styles.optionActive : '',
                      selected ? styles.optionSelected : '',
                    ]
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                  {option.label}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
