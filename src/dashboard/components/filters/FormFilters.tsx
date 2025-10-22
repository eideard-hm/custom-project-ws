import type { ChangeEvent } from 'react';

import type { FormikErrors } from 'formik';
import { MultiSelect, Option } from 'react-multi-select-component';

import { OTR_SERVICE_CODE, UBI_SERVICE_CODE } from '../../../utils';
import type {
  IInitialValues,
  INaturalHoseByService,
  ISelectedServie,
  IService,
  ISex,
} from '../../types';

import styles from './FormFilters.module.css';
import generalStyles from './General.module.css';

interface Props {
  sexs: ISex[];
  selectedService: ISelectedServie;
  selectedEcoSector: ISelectedServie;
  naturalHoses: INaturalHoseByService[];
  naturalHosesEcoSector: INaturalHoseByService[];
  peopleLocation: IService[];
  economySectors: IService[];
  values: IInitialValues;
  handleChange: (e: ChangeEvent<any>) => void;
  handlePeopleLocation: (
    e: ChangeEvent<HTMLSelectElement>,
    code: string
  ) => void;
  selected: Option[];
  setSelected: (value: Option[]) => void;
  optionsSelectedEconSector: Option[];
  setOptionsSelectedEconSector: (value: Option[]) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<IInitialValues>>;
}

export default function FormFilters({
  sexs,
  selectedService,
  selectedEcoSector,
  naturalHoses,
  naturalHosesEcoSector,
  peopleLocation,
  economySectors,
  values,
  handleChange,
  handlePeopleLocation,
  selected,
  setSelected,
  optionsSelectedEconSector,
  setOptionsSelectedEconSector,
  setFieldValue,
}: Props) {
  return (
    <div className={`${generalStyles.card}`}>
      <h3 className={generalStyles.title}>Filtros de envío</h3>
      <div className={styles.grid}>
        <div className={styles.group}>
          <label className={styles.label}>Género:</label>
          <div className={styles.radioGroup}>
            {sexs.map(({ Id, TitleNaturalHose }) => (
              <label
                key={Id}
                className={styles.radioLabel}
              >
                <input
                  type='radio'
                  name='sex'
                  value={Id}
                  className={styles.radio}
                  onChange={handleChange}
                />
                <span>{TitleNaturalHose}</span>
              </label>
            ))}
            <label className={styles.radioLabel}>
              <input
                type='radio'
                name='sex'
                value=''
                className={styles.radio}
                defaultChecked
                onChange={handleChange}
              />
              <span>Todos</span>
            </label>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Ubicación Persona:</label>
          <select
            className={styles.select}
            name='service'
            value={values.service}
            onChange={(e) => handlePeopleLocation(e, UBI_SERVICE_CODE)}
          >
            <option value=''>-- Seleccione un servicio --</option>
            {peopleLocation.map(({ Id, TitleNameServices }) => (
              <option
                key={Id}
                value={Id}
              >
                {TitleNameServices}
              </option>
            ))}
          </select>
        </div>

        {selectedService.id && (
          <div className={styles.group}>
            <label className={styles.label}>{selectedService.label}:</label>
            <MultiSelect
              value={selected}
              disabled={values.sendAllNaturalHoses}
              onChange={setSelected}
              options={naturalHoses.map(({ Id, TitleNaturalHose }) => ({
                value: String(Id),
                label: TitleNaturalHose,
              }))}
              labelledBy='Select'
              className={generalStyles.multiSelect}
            />

            <div className={styles.checkbox}>
              <input
                type='checkbox'
                id='sendAllNaturalHoses'
                name='sendAllNaturalHoses'
                checked={values.sendAllNaturalHoses}
                onChange={(e) =>
                  setFieldValue('sendAllNaturalHoses', e.target.checked)
                }
              />
              <label htmlFor='sendAllNaturalHoses'>
                ¿Enviar a todos/as {selectedService.label}?
              </label>
            </div>
          </div>
        )}

        <div className={styles.group}>
          <label className={styles.label}>Actividad Económica:</label>
          <select
            className={styles.select}
            name='economicSector'
            onChange={(e) => handlePeopleLocation(e, OTR_SERVICE_CODE)}
          >
            <option value=''>-- Seleccione una actividad --</option>
            {economySectors.map(({ Id, TitleNameServices }) => (
              <option
                key={Id}
                value={Id}
              >
                {TitleNameServices}
              </option>
            ))}
          </select>
        </div>

        {selectedEcoSector.id && (
          <div className={styles.group}>
            <label className={styles.label}>{selectedEcoSector.label}:</label>
            <MultiSelect
              value={optionsSelectedEconSector}
              onChange={setOptionsSelectedEconSector}
              options={naturalHosesEcoSector.map(
                ({ Id, TitleNaturalHose }) => ({
                  value: String(Id),
                  label: TitleNaturalHose,
                })
              )}
              labelledBy='Select'
              className={styles.multiSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
}
