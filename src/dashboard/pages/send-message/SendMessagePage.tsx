import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';

import { useFormik } from 'formik';
import type { Option } from 'react-multi-select-component';

import { useAuthContext, useDashboardContext } from '../../../hooks';
import { useBulkMessaging } from '../../../hooks/useBulkMessaging';
import {
  equalsIgnoringCase,
  OTR_SERVICE_CODE,
  UBI_SERVICE_CODE,
} from '../../../utils';
import AttachedFile from '../../components/attached-file/AttachedFile';
import FormFilters from '../../components/filters/FormFilters';
import MessageEditor from '../../components/filters/MessageEditor';
import PreviewPanel from '../../components/filters/PreviewPanel';
import StickyFooterActions from '../../components/filters/StickyFooterActions';
import { type FilterCriteria, filterRecipients } from '../../domain/bulkMessaging';
import {
  getAllShipmentOrdersAsync,
  getLocations,
  retrieveNaturalHoses,
  retrieveSexs,
} from '../../services';
import type {
  IInitialValues,
  INaturalHoseByService,
  ISelectedServie,
  IService,
  ISex,
  ShipmentOrdersResponse,
} from '../../types';
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
  const filteredAttachment = attachFile.filter((a) => a.base64 && a.name);
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

 useEffect(() => {
   const ac = new AbortController();

   const init = async () => {
     const results = await Promise.allSettled([
       getAllShipmentOrdersAsync(), 
       getLocations(UBI_SERVICE_CODE),
       getLocations(OTR_SERVICE_CODE),
       retrieveSexs(),
     ]);

     if (results[0].status === 'fulfilled') {
       const shipments = results[0].value;
       shipmentsRef.current = shipments;
       setPeopleSendOptions(
         shipments.map(({ FullName, Id }: any) => ({
           label: FullName,
           value: Id,
           key: String(Id),
         }))
       );
     } else {
       console.error('getAllShipmentOrdersAsync error:', results[0].reason);
     }

     if (results[1].status === 'fulfilled') {
       setPeopleLocation(results[1].value);
     } else {
       console.error('getLocations(UBI) error:', results[1].reason);
     }

     if (results[2].status === 'fulfilled') {
       setEconomySectors(results[2].value);
     } else {
       console.error('getLocations(OTR) error:', results[2].reason);
     }

     if (results[3].status === 'fulfilled') {
       setSexs(results[3].value);
     } else {
       console.error('retrieveSexs error:', results[3].reason);
     }
   };

   init();
   return () => ac.abort();
 }, []);

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
     onSubmit: async (vals) => {
       await send(vals, buildCriteria())
     },
   });

  const buildCriteria = useCallback(() => {
    const criteria: FilterCriteria = {
      peopleIds: values.peopleSend.map((o) => String(o.value)),
      serviceId: values.service || undefined,
      sexId: values.sex || undefined,
      economicSectorId: values.economicSector || undefined,
      naturalHoseIdsByService: !values.sendAllNaturalHoses
        ? selected.map((o) => String(o.value))
        : [],
      naturalHoseIdsByEco: optionsSelectedEconSector.map((o) =>
        String(o.value)
      ),
      sendAllNaturalHoses: values.sendAllNaturalHoses,
    };
    return criteria;
  }, [
    values.peopleSend,
    values.service,
    values.sex,
    values.economicSector,
    values.sendAllNaturalHoses,
    selected,
    optionsSelectedEconSector,
  ]);
  
  const criteria = useMemo(buildCriteria, [buildCriteria]);

  const filteredRecipients = useMemo(() => {
    return filterRecipients(shipmentsRef.current, criteria);
  }, [criteria]);

  const recipientsCount = useMemo(() => {
    return (values.sendWsContacts ? 1 : 0) + filteredRecipients.length;
  }, [values.sendWsContacts, filteredRecipients.length]);

  const parsedMessage = useMemo(
    () =>
      values.message
        .trim()
        .replace(/{user}/gi, fullName)
        .replace(/{location}/gi, town),
    [values.message, fullName, town]
  );

  const handlePeopleLocation = async (
    e: ChangeEvent<HTMLSelectElement>,
    serviceCode: string
  ) => {
    const index = e.target.selectedIndex;
    const label = e.target[index].textContent ?? '';
    const serviceId = (e.target.value ?? '').trim();

    if (serviceId) {
      const hoses = await retrieveNaturalHoses(serviceId);
      if (equalsIgnoringCase(serviceCode, UBI_SERVICE_CODE)) {
        setNaturalHoses(hoses);
        setSelectedService({ label, id: serviceId });
      } else {
        setNaturalHosesEcoSector(hoses);
        setSelectedEcoSector({ label, id: serviceId });
      }
      return;
    }

    if (equalsIgnoringCase(serviceCode, UBI_SERVICE_CODE))
      setSelectedService({ label: '', id: '' });
    else setSelectedEcoSector({ label: '', id: '' });
  };

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
            parsedMessage={parsedMessage}
            rawMessage={values.message.trim()}
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
