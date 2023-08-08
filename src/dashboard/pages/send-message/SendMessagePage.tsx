/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type ChangeEvent } from 'react';

import { useFormik } from 'formik';
import { MultiSelect, type Option } from 'react-multi-select-component';

import toast from 'react-hot-toast';
import { useAuthContext, useDashboardContext } from '../../../hooks';
import { Card } from '../../../shared/components';
import { equalsIgnoringCase, isNullOrWhiteSpaces } from '../../../utils';
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
import { UBI_SERVICE_CODE, OTR_SERVICE_CODE } from '../../../utils';

import './SendMessage.css';

const initialValues: IInitialValues = {
  service: '',
  message: '',
  sendWsContacts: false,
  sex: '',
  sendAllNaturalHoses: true,
  economicSector: '',
};

function SendMessagePage() {
  const [isSending, setIsSending] = useState(false);
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
  const [shiptmet, setShiptmet] = useState<ShipmentOrdersResponse[]>([]);
  const [selected, setSelected] = useState<Option[]>([]);
  const [optionsSelectedEconSector, setOptionsSelectedEconSector] = useState<
    Option[]
  >([]);
  const { dirty, handleChange, handleSubmit, setFieldValue, values } =
    useFormik({
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
      .then((shipments) => setShiptmet(shipments))
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
    if (
      values.message.includes('{user}') ||
      values.message.includes('{User}') ||
      values.message.includes('{USER}')
    ) {
      setIsSending(true);
      let shipmentFilter = [...shiptmet];

      // filter shipment
      if (!isNullOrWhiteSpaces(values.service)) {
        shipmentFilter = shipmentFilter.filter(({ Services: { Id } }) =>
          equalsIgnoringCase(values.service, String(Id))
        );
      }

      if (!isNullOrWhiteSpaces(values.sex)) {
        shipmentFilter = shipmentFilter.filter(({ Sex: { Id } }) =>
          equalsIgnoringCase(values.sex, String(Id))
        );
      }

      if (!isNullOrWhiteSpaces(values.economicSector)) {
        shipmentFilter = shipmentFilter.filter(
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
        shipmentFilter = shipmentFilter.filter(({ NaturalHose }) =>
          selected.some(({ value }) =>
            equalsIgnoringCase(value, String(NaturalHose?.Id ?? ''))
          )
        );
      }

      if (
        optionsSelectedEconSector.length > 0 &&
        !isNullOrWhiteSpaces(optionsSelectedEconSector[0]?.value ?? '')
      ) {
        shipmentFilter = shipmentFilter.filter(
          ({
            NaturalHose_ShipmentOrders_EconomicActivityToNaturalHose: econAct,
          }) =>
            optionsSelectedEconSector.some(({ value }) =>
              equalsIgnoringCase(value, String(econAct?.Id ?? ''))
            )
        );
      }

      if (shipmentFilter.length === 0) {
        toast.error(
          'No se encontrarón receptores asociados a los criteríos de busqueda.'
        );
        setIsSending(false);
        return;
      }

      const receivedMessages: ISendBulkMessage[] = shipmentFilter
        .filter(({ Phone }) => Phone)
        .map(({ FirstName, LastName, Phone }) => ({
          phone: Phone ?? '',
          message: values.sendWsContacts
            ? values.message
            : `${values.message
                .replaceAll('{name}', `*${FirstName}*`)
                .replaceAll('{NAME}', `*${FirstName}*`)
                .replaceAll('{Name}', `*${FirstName}*`)
                .replaceAll('{lastname}', `*${LastName}*`)
                .replaceAll('{Lastname}', `*${LastName}*`)
                .replaceAll('{LastName}', `*${LastName}*`)
                .replaceAll('{LASTNAME}', `*${LastName}*`)
                .replaceAll('{user}', `*${fullName}*`)
                .replaceAll('{User}', `*${fullName}*`)
                .replaceAll('{USER}', `*${fullName}*`)
                .replaceAll('{location}', `*${town}*`)
                .replaceAll('{Location}', `*${town}*`)
                .replaceAll('{LOCATION}', `*${town}*`)}`,
        }));

      const message: ISendBulkMessageWithAttach = {
        content: receivedMessages,
        attach: attachFile,
        sendWsContacts: values.sendWsContacts,
      };

      const response = await sendMesssageBulkAsync(message);
      setIsSending(false);
      if (response.length > 0) {
        toast.success('Mensajes enviados correctamente!');
      }
      return;
    }

    toast.error('Debe de agregar la convensión para reemplazar la información');
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
            <form
              onSubmit={handleSubmit}
              className='row'
            >
              <div className='col-6'>
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

              <div className='col-6'>
                <div className='form-group'>
                  <label>Ubicación Persona</label>
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
                    style={{ marginTop: '2.5rem' }}
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
                isSending ? 'disabled btn-progress' : ''
              }`}
              type='submit'
              disabled={
                !dirty ||
                !values.message ||
                (shiptmet.length === 0 && !values.sendWsContacts)
              }
              onClick={handleSendBulkMessages}
            >
              <i className='fa-solid fa-paper-plane mr-2'></i>
              Envíar Mensaje
            </button>
          </div>
        </div>
      </Card>

      {values.message && (
        <Card>
          <div className='col-12'>
            <div className='card-header'>
              <h4>Mensaje a Envíar</h4>
            </div>

            <section className='card-body'>{values.message}</section>
          </div>
        </Card>
      )}
    </section>
  );
}

export default SendMessagePage;
