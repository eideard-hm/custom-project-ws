/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type ChangeEvent } from 'react';

import { useFormik } from 'formik';

import toast from 'react-hot-toast';
import { needs } from '../../../data';
import { useAuthContext, useDashboardContext } from '../../../hooks';
import { Card } from '../../../shared/components';
import type { IUserDataMaestros } from '../../../types';
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

function SendMessagePage() {
  const [isSending, setIsSending] = useState(false);
  const [sendWsContacts, setSendWsContacts] = useState({
    customMessage: '',
    sendWsContacts: false,
  });
  const [selectedService, setSelectedService] = useState<IUserDataMaestros>({
    name: '',
    value: '',
  });
  const [, setSexs] = useState<ISex[]>([]);
  const [naturalHoses, setNaturalHoses] = useState<INaturalHoseByService[]>([]);
  const [peopleLocation, setPeopleLocation] = useState<IService[]>([]);
  const [shiptmet, setShiptmet] = useState<ShipmentOrdersResponse[]>([]);
  const { dirty, handleChange, handleSubmit } = useFormik({
    initialValues: {},
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

    setSelectedService({ name: label, value: serviceId });
    getNaturalHoses(serviceId);
  };

  const getNaturalHoses = async (serviceId: string) => {
    const naturalHouse = await retrieveNaturalHoses(serviceId);
    setNaturalHoses(naturalHouse);
  };

  const handleSendBulkMessages = async () => {
    if (
      sendWsContacts.customMessage.includes('{user}') ||
      sendWsContacts.customMessage.includes('{User}') ||
      sendWsContacts.customMessage.includes('{USER}')
    ) {
      setIsSending(true);

      const receivedMessages: ISendBulkMessage[] = shiptmet
        .filter(({ Phone }) => Phone)
        .map(({ FirstName, LastName, Phone }) => ({
          phone: Phone ?? '',
          message: sendWsContacts.sendWsContacts
            ? sendWsContacts.customMessage
            : `${sendWsContacts.customMessage
                .replaceAll('{name}', `*${FirstName}*`)
                .replaceAll('{NAME}', `*${FirstName}*`)
                .replaceAll('{Name}', `*${FirstName}*`)
                .replaceAll('Name', `*${FirstName}*`)
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
        sendWsContacts: sendWsContacts.sendWsContacts,
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
                  <label>Ubicación: </label>
                  <div className='mt-3'>
                    <label className='custom-switch'>
                      <input
                        type='radio'
                        name='Ubication'
                        value='Rural'
                        className='custom-switch-input'
                        onChange={handleChange}
                      />
                      <span className='custom-switch-indicator'></span>
                      <span className='custom-switch-description'>Rural</span>
                    </label>
                    <label className='custom-switch'>
                      <input
                        type='radio'
                        name='Ubication'
                        value='Urbano'
                        className='custom-switch-input'
                        defaultChecked={true}
                        onChange={handleChange}
                      />
                      <span className='custom-switch-indicator'></span>
                      <span className='custom-switch-description'>Urbano</span>
                    </label>
                  </div>
                </div>

                <div className='form-group'>
                  <label>Ubicación Persona</label>
                  <select
                    className='form-control'
                    name='peopleLocation'
                    onChange={handlePeopleLocation}
                  >
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
                <div className='form-group'>
                  <label>Caracterización:</label>
                  <select
                    className='form-control'
                    name='Need'
                    onChange={handleChange}
                  >
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
                  <label>Mensaje</label>
                  <textarea
                    className='form-control'
                    value={sendWsContacts.customMessage}
                    onChange={(e) =>
                      setSendWsContacts((prev) => ({
                        ...prev,
                        customMessage: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='send-ws-contacts'
                  checked={sendWsContacts.sendWsContacts}
                  onChange={(e) =>
                    setSendWsContacts((prev) => ({
                      ...prev,
                      sendWsContacts: e.target.checked,
                    }))
                  }
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
                !sendWsContacts.customMessage ||
                (shiptmet.length === 0 && !sendWsContacts.sendWsContacts)
              }
              onClick={handleSendBulkMessages}
            >
              <i className='fa-solid fa-paper-plane mr-2'></i>
              Envíar Mensaje
            </button>
          </div>
        </div>
      </Card>
      <Card>
        <div className='col-12'>
          <div className='card-header'>
            <h4>Mensaje a Envíar</h4>
          </div>

          <section className='card-body'>Aqui deberia de ir el mensahe</section>
        </div>
      </Card>
    </section>
  );
}

export default SendMessagePage;
