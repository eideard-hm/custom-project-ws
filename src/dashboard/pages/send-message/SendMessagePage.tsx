/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type ChangeEvent } from 'react';

import { useFormik } from 'formik';

import toast from 'react-hot-toast';
import { needs } from '../../../data';
import { useAuthContext, useDashboardContext } from '../../../hooks';
import { Card } from '../../../shared/components';
import type { IUserDataMaestros } from '../../../types';
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
  INaturalHoseByService,
  ISendBulkMessage,
  ISendBulkMessageWithAttach,
  IService,
  ISex,
  ShipmentOrdersResponse,
} from '../../types';

const initialValues = {
  need: '',
  service: '0',
  message: '',
  sendWsContacts: false,
};

function SendMessagePage() {
  const [isSending, setIsSending] = useState(false);
  const [selectedService, setSelectedService] = useState<IUserDataMaestros>({
    name: '',
    value: '',
  });
  const [, setSexs] = useState<ISex[]>([]);
  const [naturalHoses, setNaturalHoses] = useState<INaturalHoseByService[]>([]);
  const [peopleLocation, setPeopleLocation] = useState<IService[]>([]);
  const [shiptmet, setShiptmet] = useState<ShipmentOrdersResponse[]>([]);
  const { dirty, handleChange, handleSubmit, values } = useFormik({
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

    getLocations()
      .then((location) => setPeopleLocation(location))
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

  const handlePeopleLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e) return;

    const index = e.target.selectedIndex;
    const label = e.target[index].textContent ?? '';
    const serviceId = e.target.value;

    if (Number(serviceId ?? 0) > 0) {
      getNaturalHoses(serviceId);
      setSelectedService({ name: label, value: serviceId });
      return;
    }

    setSelectedService({ name: '', value: '' });
  };

  const getNaturalHoses = async (serviceId: string) => {
    const naturalHouse = await retrieveNaturalHoses(serviceId);
    setNaturalHoses(naturalHouse);
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
      if (!isNullOrWhiteSpaces(values.need)) {
        shipmentFilter = shipmentFilter.filter(({ Need }) =>
          equalsIgnoringCase(values.need, Need ?? '')
        );
      }

      if (!isNullOrWhiteSpaces(values.service)) {
        shipmentFilter = shipmentFilter.filter(
          ({ Services: { Id } }) => Number(values.service) === Id
        );
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
              <div className='col-12'>
                <div className='form-group'>
                  <label>Caracterización:</label>
                  <select
                    className='form-control'
                    name='need'
                    value={values.need}
                    onChange={handleChange}
                  >
                    <option value=''>
                      -- Seleccione una Caracterización --
                    </option>
                    {needs.map(({ name, value }, i) => (
                      <option
                        key={i}
                        value={value}
                      >
                        {name}
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
                    onChange={(e) => {
                      handlePeopleLocation(e);
                      handleChange(e);
                    }}
                  >
                    <option value={0}>-- Seleccione un servicio --</option>
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

                {/* <div className='form-group'>
                  <label
                    htmlFor='sendAllSidewalks'
                    className='d-block'
                  >
                    Receptores
                  </label>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='sendAllSidewalks'
                      name='sendAllSidewalks'
                      defaultChecked
                    />
                    <label
                      className='form-check-label'
                      htmlFor='sendAllSidewalks'
                    >
                      ¿ Envío a todas las Veredas ?
                    </label>
                  </div>
                </div>
                
                </div> */}
              </div>

              <div className='col-6'>
                {selectedService.value && (
                  <div className='form-group'>
                    <label>{selectedService.name}</label>
                    <select
                      className='form-control'
                      name={selectedService.name}
                      onChange={handleChange}
                    >
                      {naturalHoses.map(({ Id, TitleNaturalHose }) => (
                        <option
                          key={Id}
                          value={Id}
                        >
                          {TitleNaturalHose}
                        </option>
                      ))}
                    </select>
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
