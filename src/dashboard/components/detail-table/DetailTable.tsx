import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { DashboardContext } from '../../../context';
import {
  getAllShipmentOrdersAsync,
  sendMesssageBulkAsync
} from '../../services';
import type {
  ISendBulkMessage,
  ISendBulkMessageWithAttach,
  ShipmentOrdersCreateInput
} from '../../types';

export function DetailTable() {
  const [sendWsContacts, setSendWsContacts] = useState({
    customMessage: '',
    sendWsContacts: false,
  });
  const [shiptmet, setShiptmet] = useState<ShipmentOrdersCreateInput[]>([]);
  const { attachFile } = useContext(DashboardContext);

  useEffect(() => {
    getAllShipmentOrdersAsync()
      .then((shipments) => {
        console.log({ shipments });
        setShiptmet(shipments);
      })
      .catch(console.error);
  }, []);

  const handleSendBulkMessages = async () => {
    const receivedMessages: ISendBulkMessage[] = shiptmet.map(
      ({ FirstName, LastName, Phone }) => ({
        phone: Phone,
        message: `${sendWsContacts.customMessage
          .replaceAll('{name}', `*${FirstName}`)
          .replaceAll('{lastname}', `${LastName}*`)}`,
      })
    );

    const message: ISendBulkMessageWithAttach = {
      content: receivedMessages,
      attach: attachFile,
      sendWsContacts: sendWsContacts.sendWsContacts,
    };

    const response = await sendMesssageBulkAsync(message);
    if (response.length > 0) {
      toast.success('Mensajes enviados correctamente!');
    }
  };

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h4>Usuarios</h4>
            <div className='card-header-form'>
              <form>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search'
                  />
                  <div className='input-group-btn'>
                    <button className='btn btn-primary'>
                      <i className='fas fa-search'></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table table-striped'>
                <tbody>
                  <tr>
                    <th className='text-center'>
                      <div className='custom-checkbox custom-checkbox-table custom-control'>
                        <input
                          type='checkbox'
                          data-checkboxes='mygroup'
                          data-checkbox-role='dad'
                          className='custom-control-input'
                          id='checkbox-all'
                        />
                        <label
                          htmlFor='checkbox-all'
                          className='custom-control-label'
                        >
                          &nbsp;
                        </label>
                      </div>
                    </th>
                    <th className='text-center'>Nombres</th>
                    <th className='text-center'>Apellidos</th>
                    <th className='text-center'>Email</th>
                    <th className='text-center'>Teléfono</th>
                    <th className='text-center'>Fecha Nacimiento</th>
                    <th className='text-center'>Tipo Documento</th>
                    <th className='text-center'>Genero</th>
                    <th className='text-center'>Ubicación</th>
                    <th className='text-center'>Vereda</th>
                    <th className='text-center'>Caracterización</th>
                  </tr>
                  {shiptmet.map((s, i) => (
                    <tr key={i}>
                      <td className='p-0 text-center'>
                        <div className='custom-checkbox custom-control'>
                          <input
                            type='checkbox'
                            data-checkboxes='mygroup'
                            className='custom-control-input'
                            id={'checkbox-' + i}
                          />
                          <label
                            htmlFor={'checkbox-' + i}
                            className='custom-control-label'
                          >
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td className='text-center'>{s.FirstName}</td>
                      <td className='text-center'>{s.LastName}</td>
                      <td className='text-center'>{s.Email}</td>
                      <td className='text-center'>{s.Phone}</td>
                      <td className='text-center'>{s.BirthDate}</td>
                      <td className='text-center'>{s.DocumentType}</td>
                      <td className='text-center'>{s.SexId}</td>
                      <td className='text-center'>{s.Ubication}</td>
                      <td className='text-center'>{s.Sidewalk}</td>
                      <td className='text-center'>{s.Need}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='card-footer'>
            <hr />
            <div className='row'>
              <div className='form-group col-12'>
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
            </div>

            <div className='text-right'>
              <button
                disabled={
                  !sendWsContacts.customMessage ||
                  (shiptmet.length === 0 && !sendWsContacts.sendWsContacts)
                }
                className='btn btn-primary mr-1'
                onClick={handleSendBulkMessages}
              >
                Envíar Mensajes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
