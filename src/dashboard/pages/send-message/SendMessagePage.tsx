import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';

import { useFormik } from 'formik';
import type { Option } from 'react-multi-select-component';

import { useAuthContext, useDashboardContext } from '../../../hooks';
import {
  OTR_SERVICE_CODE,
  UBI_SERVICE_CODE
} from '../../../utils';
import FormFilters from '../../components/filters/FormFilters';
import MessageEditor from '../../components/filters/MessageEditor';
import PreviewPanel from '../../components/filters/PreviewPanel';
import StickyFooterActions from '../../components/filters/StickyFooterActions';
import {
  getAllShipmentOrdersAsync,
  getLocations,
  retrieveNaturalHoses,
  retrieveSexs
} from '../../services';
import type {
  IInitialValues,
  INaturalHoseByService,
  ISelectedServie,
  IService,
  ISex,
  ShipmentOrdersResponse
} from '../../types';

import { useBulkMessaging } from '../../../hooks/useBulkMessaging';
import AttachedFile from '../../components/attached-file/AttachedFile';
import styles from './SendMessagePage.module.css';

const initialValues: IInitialValues = {
  service: '',
  message: '',
  sendWsContacts: false,
  sex: '',
  sendAllNaturalHoses: true,
  economicSector: '',
  peopleSend: [],
};

function SendMessagePage() {
  const [sexs, setSexs] = useState<ISex[]>([]);
  const [peopleLocation, setPeopleLocation] = useState<IService[]>([]);
  const [economySectors, setEconomySectors] = useState<IService[]>([]);
  const [naturalHoses, setNaturalHoses] = useState<INaturalHoseByService[]>([]);
  const [naturalHosesEcoSector, setNaturalHosesEcoSector] = useState<
    INaturalHoseByService[]
  >([]);

  const [selectedService, setSelectedService] = useState<ISelectedServie>({
    label: '',
    id: '',
  });
  const [selectedEcoSector, setSelectedEcoSector] = useState<ISelectedServie>({
    label: '',
    id: '',
  });

  const [selected, setSelected] = useState<Option[]>([]);
  const [peopleSendOptions, setPeopleSendOptions] = useState<Option[]>([]);
  const [optionsSelectedEconSector, setOptionsSelectedEconSector] = useState<
    Option[]
  >([]);

  const shipmentsRef = useRef<ShipmentOrdersResponse[]>([]);

  const { attachFile, wsSessionStatus } = useDashboardContext();
  const filteredAttachment = attachFile.filter(a => a.base64 && a.name)
  const {
    userData: { fullName, town },
  } = useAuthContext();
  const { send } = useBulkMessaging({
    shipments: shipmentsRef.current,
    fullName,
    town,
    attach: filteredAttachment,
    onSuccess: () => resetForm(),
  });

  const onSubmit = async (vals: IInitialValues) => {
    const criteria = {
      peopleIds: vals.peopleSend.map((o) => String(o.value)),
      serviceId: vals.service || undefined,
      sexId: vals.sex || undefined,
      economicSectorId: vals.economicSector || undefined,
      naturalHoseIdsByService: !vals.sendAllNaturalHoses
        ? selected.map((o) => String(o.value))
        : [],
      naturalHoseIdsByEco: optionsSelectedEconSector.map((o) =>
        String(o.value)
      ),
      sendAllNaturalHoses: vals.sendAllNaturalHoses,
    } as const;

    await send(vals, criteria);
  };

  const {
    dirty,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
    setFieldValue,
    values,
  } = useFormik<IInitialValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const [shipments, ubi, econ, sex] = await Promise.all([
          getAllShipmentOrdersAsync(),
          getLocations(UBI_SERVICE_CODE),
          getLocations(OTR_SERVICE_CODE),
          retrieveSexs(),
        ]);
        shipmentsRef.current = shipments;
        setPeopleSendOptions(
          shipments.map(({ FullName, Id }) => ({
            label: FullName,
            value: Id,
            key: Id.toString(),
          }))
        );
        setPeopleLocation(ubi);
        setEconomySectors(econ);
        setSexs(sex);
      } catch (e) {
        console.error(e);
      }
    };
    init();
  }, []);

  const handlePeopleLocation = async (
    e: ChangeEvent<HTMLSelectElement>,
    serviceCode: string
  ) => {
    const index = e.target.selectedIndex;
    const label = e.target[index].textContent ?? '';
    const serviceId = (e.target.value ?? '').trim();

    if (serviceId) {
      const hoses = await retrieveNaturalHoses(serviceId);
      if (serviceCode === UBI_SERVICE_CODE) {
        setNaturalHoses(hoses);
        setSelectedService({ label, id: serviceId });
      } else {
        setNaturalHosesEcoSector(hoses);
        setSelectedEcoSector({ label, id: serviceId });
      }
      return;
    }

    if (serviceCode === UBI_SERVICE_CODE)
      setSelectedService({ label: '', id: '' });
    else setSelectedEcoSector({ label: '', id: '' });
  };

  const recipientsCount = useMemo(
    () => (values.sendWsContacts ? 1 : 0) + (values.peopleSend?.length ?? 0),
    [values.peopleSend, values.sendWsContacts]
  );

  const parsedMessage = useMemo(
    () => values.message.trim()
    .replace(/{user}/gi, fullName)
    .replace(/{location}/gi, town),
    [values.message, fullName, town]
  )

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>📨 Envío de Mensajes Másivos</h2>
        <p className={styles.subtitle}>
          Configura y envía mensajes personalizados a tus contactos usando las
          convenciones disponibles.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <FormFilters
            sexs={sexs}
            selectedService={selectedService}
            selectedEcoSector={selectedEcoSector}
            naturalHoses={naturalHoses}
            naturalHosesEcoSector={naturalHosesEcoSector}
            peopleLocation={peopleLocation}
            economySectors={economySectors}
            values={values}
            handleChange={handleChange}
            handlePeopleLocation={handlePeopleLocation}
            selected={selected}
            setSelected={setSelected}
            optionsSelectedEconSector={optionsSelectedEconSector}
            setOptionsSelectedEconSector={setOptionsSelectedEconSector}
            setFieldValue={setFieldValue}
          />

          <MessageEditor
            peopleSendOptions={peopleSendOptions}
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        </div>

        <div className={styles.right}>
          <PreviewPanel
            rawMessage={parsedMessage}
            recipientsCount={recipientsCount}
            attachmentsCount={filteredAttachment.length}
          />
        </div>
      </div>

      <StickyFooterActions
        isSubmitting={isSubmitting}
        disabled={
          isSubmitting ||
          !dirty ||
          !values.message.trim() ||
          (shipmentsRef.current.length === 0 && !values.sendWsContacts)
        }
        onSubmit={handleSubmit}
        wsSessionStatus={wsSessionStatus}
      >
        <AttachedFile />
      </StickyFooterActions>
    </section>
  );
}

export default SendMessagePage;
