/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, type ChangeEvent } from 'react';

import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { MultiSelect, type Option } from 'react-multi-select-component';

import { useAuthContext, useDashboardContext } from '../../../hooks';
import { Card } from '../../../shared/components';
import {
  equalsIgnoringCase,
  isNullOrWhiteSpaces,
  OTR_SERVICE_CODE,
  UBI_SERVICE_CODE,
} from '../../../utils';
import { AttachedFile, ConventionsReeplace } from '../../components';
import {
  getAllShipmentOrdersAsync,
  getLocations,
  retrieveNaturalHoses,
  retrieveSexs,
  sendMesssageBulkAsync,
} from '../../services';
import type {
  IInitialValues,
  INaturalHoseByService,
  ISelectedServie,
  ISendBulkMessage,
  ISendBulkMessageWithAttach,
  IService,
  ISex,
  ShipmentOrdersResponse,
} from '../../types';

import './SendMessage.css';

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
  const [selectedService, setSelectedService] = useState<ISelectedServie>({
    label: '',
    id: '',
  });
  const [selectedEcoSector, setSelectedEcoSector] = useState<ISelectedServie>({
    label: '',
    id: '',
  });
  const [sexs, setSexs] = useState<ISex[]>([]);
  const [naturalHoses, setNaturalHoses] = useState<INaturalHoseByService[]>([]);
  const [naturalHosesEcoSector, setNaturalHosesEcoSector] = useState<
    INaturalHoseByService[]
  >([]);
  const [peopleLocation, setPeopleLocation] = useState<IService[]>([]);
  const [economySectors, setEconomySectors] = useState<IService[]>([]);
  const [selected, setSelected] = useState<Option[]>([]);
  const [peopleSendOptions, setPeopleSendOptions] = useState<Option[]>([]);
  const [optionsSelectedEconSector, setOptionsSelectedEconSector] = useState<
    Option[]
  >([]);
  const shiptmet = useRef<ShipmentOrdersResponse[]>([]);
  const {
    dirty,
    handleChange,
    setFieldValue,
    values,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit(values) {
      console.log({ values });
    },
  });
  const { attachFile } = useDashboardContext();
  const {
    userData: { fullName, town },
  } = useAuthContext();

  useEffect(() => {
    initServices();
  }, []);

  const initServices = () => {
    getAllShipmentOrders();

    getLocations(UBI_SERVICE_CODE)
      .then((location) => setPeopleLocation(location))
      .catch(console.error);

    getLocations(OTR_SERVICE_CODE)
      .then((sectors) => setEconomySectors(sectors))
      .catch(console.error);

    retrieveSexs()
      .then((sex) => setSexs(sex))
      .catch(console.error);
  };

  const getAllShipmentOrders = () => {
    getAllShipmentOrdersAsync()
      .then((shipments) => {
        shiptmet.current = [...shipments];
        setPeopleSendOptions(
          shipments.map(({ FullName, Id }) => ({
            label: FullName,
            value: Id,
            key: Id.toString(),
          }))
        );
      })
      .catch(console.error);
  };

  const handlePeopleLocation = async (
    e: ChangeEvent<HTMLSelectElement>,
    serviceCode: string
  ) => {
    if (!e) return;

    const index = e.target.selectedIndex;
    const label = e.target[index].textContent ?? '';
    const serviceId = (e.target.value ?? '').trim();

    if (serviceId) {
      getNaturalHoses(serviceId, serviceCode);

      if (serviceCode === UBI_SERVICE_CODE) {
        setSelectedService({ label, id: serviceId });
      } else {
        setSelectedEcoSector({ label, id: serviceId });
      }
      return;
    }

    if (serviceCode === UBI_SERVICE_CODE) {
      setSelectedService({ label: '', id: '' });
    } else {
      setSelectedEcoSector({ label: '', id: '' });
    }
  };

  const getNaturalHoses = async (serviceId: string, serviceCode: string) => {
    const naturalHouse = await retrieveNaturalHoses(serviceId);
    if (serviceCode === UBI_SERVICE_CODE) {
      setNaturalHoses(naturalHouse);
    } else {
      setNaturalHosesEcoSector(naturalHouse);
    }
  };

  const handleSendBulkMessages = async () => {
    const messageConvertLower = values.message.toLocaleLowerCase();
    if (
      messageConvertLower.includes('{user}') &&
      messageConvertLower.includes('{location}')
    ) {
      setSubmitting(true);
      let filteredShiptments = [...shiptmet.current];

      if (values.peopleSend.length > 0) {
        filteredShiptments = filteredShiptments.filter(({ Id }) =>
          values.peopleSend.some(({ value }) =>
            equalsIgnoringCase(Id.toString(), value)
          )
        );
      }

      if (!isNullOrWhiteSpaces(values.service)) {
        filteredShiptments = filteredShiptments.filter(({ Services: { Id } }) =>
          equalsIgnoringCase(values.service, String(Id))
        );
      }

      if (!isNullOrWhiteSpaces(values.sex)) {
        filteredShiptments = filteredShiptments.filter(({ Sex: { Id } }) =>
          equalsIgnoringCase(values.sex, String(Id))
        );
      }

      if (!isNullOrWhiteSpaces(values.economicSector)) {
        filteredShiptments = filteredShiptments.filter(
          ({
            Services_ShipmentOrders_ServiceActivityIdToServices: econActSer,
          }) =>
            equalsIgnoringCase(
              values.economicSector,
              String(econActSer?.Id ?? '')
            )
        );
      }

      if (!values.sendAllNaturalHoses && selected.length > 0) {
        filteredShiptments = filteredShiptments.filter(({ NaturalHose }) =>
          selected.some(({ value }) =>
            equalsIgnoringCase(value, String(NaturalHose?.Id ?? ''))
          )
        );
      }

      if (
        optionsSelectedEconSector.length > 0 &&
        !isNullOrWhiteSpaces(optionsSelectedEconSector[0]?.value ?? '')
      ) {
        filteredShiptments = filteredShiptments.filter(
          ({
            NaturalHose_ShipmentOrders_EconomicActivityToNaturalHose: econAct,
          }) =>
            optionsSelectedEconSector.some(({ value }) =>
              equalsIgnoringCase(value, String(econAct?.Id ?? ''))
            )
        );
      }

      if (filteredShiptments.length === 0) {
        toast.error(
          'No se encontrarón receptores asociados a los criteríos de busqueda.'
        );
        setSubmitting(false);
        return;
      }

      const receivedMessages: ISendBulkMessage[] = filteredShiptments
        .filter(({ Phone }) => Phone)
        .map(({ FullName: receiver, Phone }) => ({
          phone: Phone ?? '',
          message: values.sendWsContacts
            ? values.message
            : `${values.message
                .replace(/{name}/gi, `*${receiver.trim()}*`)
                .replace(/{user}/gi, `*${fullName.trim()}*`)
                .replace(/{location}/gi, `*${town.trim()}*`)}`,
        }));

      console.log({ filteredShiptments, receivedMessages });

      const message: ISendBulkMessageWithAttach = {
        content: receivedMessages,
        attach: attachFile,
        sendWsContacts: values.sendWsContacts,
      };

      const response = await sendMesssageBulkAsync(message);
      setSubmitting(false);
      if (response.length > 0) {
        resetForm();
        toast.success('Mensajes enviados correctamente!');
      }
      return;
    }

    toast.error(
      'Debe de agregar la convensión para reemplazar la información.'
    );
  };

  return (
    <section className='send-messages-page'>
      <ConventionsReeplace />
      <Card>
        <div className='col-12'>
          <div className='card-header'>
            <h4>Envio Mensajes</h4>
          </div>
          <section className='card-body'>
            <form className='row'>
              <div className='col-sm-12 col-md-6'>
                <div className='form-group'>
                  <label>Genero: </label>
                  <div className='mt-3'>
                    {sexs.map(({ Id, TitleNaturalHose }) => (
                      <label
                        className='custom-switch'
                        key={Id}
                      >
                        <input
                          type='radio'
                          name='sex'
                          value={Id}
                          className='custom-switch-input'
                          onChange={handleChange}
                        />
                        <span className='custom-switch-indicator'></span>
                        <span className='custom-switch-description'>
                          {TitleNaturalHose}
                        </span>
                      </label>
                    ))}
                    <label className='custom-switch'>
                      <input
                        type='radio'
                        name='sex'
                        value=''
                        className='custom-switch-input'
                        defaultChecked={true}
                        onChange={handleChange}
                      />
                      <span className='custom-switch-indicator'></span>
                      <span className='custom-switch-description'>Todos</span>
                    </label>
                  </div>
                </div>

                {selectedService.id && (
                  <div className='form-group'>
                    <label>{selectedService.label} :</label>
                    <MultiSelect
                      value={selected}
                      disabled={values.sendAllNaturalHoses}
                      onChange={setSelected}
                      options={naturalHoses.map(({ Id, TitleNaturalHose }) => ({
                        value: String(Id),
                        label: TitleNaturalHose,
                      }))}
                      labelledBy='Select'
                      className='dark'
                    />
                  </div>
                )}

                <div className='form-group'>
                  <label>Actividad Económica :</label>
                  <select
                    className='form-control'
                    name='economicSector'
                    onChange={async (e) => {
                      handleChange(e);
                      await handlePeopleLocation(e, OTR_SERVICE_CODE);
                    }}
                  >
                    <option value=''>
                      -- Seleccione un Actividad Económica --
                    </option>
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
              </div>

              <div className='col-sm-12 col-md-6'>
                <div className='form-group'>
                  <label>Ubicación Persona: </label>
                  <select
                    className='form-control'
                    name='service'
                    value={values.service}
                    onChange={async (e) => {
                      handleChange(e);
                      await handlePeopleLocation(e, UBI_SERVICE_CODE);
                    }}
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
                  <div
                    className='form-group'
                    style={{ marginTop: '4.5rem' }}
                  >
                    <label
                      htmlFor='sendAllNaturalHoses'
                      className='d-block'
                    >
                      Receptores
                    </label>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='sendAllNaturalHoses'
                        name='sendAllNaturalHoses'
                        defaultChecked={values.sendAllNaturalHoses}
                        onChange={async (e) =>
                          await setFieldValue(
                            'sendAllNaturalHoses',
                            e.target.checked
                          )
                        }
                      />
                      <label
                        className='form-check-label'
                        htmlFor='sendAllNaturalHoses'
                      >
                        ¿ Envíar a todos/as {selectedService.label} ?
                      </label>
                    </div>
                  </div>
                )}

                {selectedEcoSector.id && (
                  <div className='form-group'>
                    <label>{selectedEcoSector.label} :</label>
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
                      className='dark'
                    />
                  </div>
                )}
              </div>

              <div className='col-12'>
                <div className='form-group'>
                  <label>Personas a Envíar:</label>
                  <div className='form-group'>
                    <MultiSelect
                      value={values.peopleSend}
                      options={peopleSendOptions}
                      onChange={async (e: Option[]) =>
                        await setFieldValue('peopleSend', e)
                      }
                      labelledBy='Select'
                      className='dark'
                    />
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <div className='form-group'>
                  <label>
                    Mensaje
                    <span className='mandatory'> *</span> :
                  </label>
                  <textarea
                    className='form-control'
                    name='message'
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='sendWsContacts'
                  id='send-ws-contacts'
                  checked={values.sendWsContacts}
                  onChange={handleChange}
                />
                <label
                  className='form-check-label'
                  htmlFor='send-ws-contacts'
                >
                  Enviar a mis <strong>contactos de WhatsApp.</strong>
                </label>
              </div>
            </form>
          </section>

          <div className='card-footer text-right'>
            <AttachedFile />
            <button
              className={`btn btn-icon icon-left btn-success ${
                isSubmitting ? 'disabled btn-progress' : ''
              }`}
              type='submit'
              disabled={
                !dirty ||
                !values.message.trim() ||
                (shiptmet.current.length === 0 && !values.sendWsContacts)
              }
              onClick={handleSendBulkMessages}
            >
              <i className='fa-solid fa-paper-plane mr-2'></i>
              Envíar Mensaje
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default SendMessagePage;
