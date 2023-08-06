import { useEffect, useState } from 'react';

import { getAllShipmentOrdersAsync } from '../../services';
import type { ShipmentOrdersResponse } from '../../types';

function DetailTablePage() {
  const [shiptmet, setShiptmet] = useState<ShipmentOrdersResponse[]>([]);

  useEffect(() => {
    getAllShipmentOrdersAsync()
      .then((shipments) => setShiptmet(shipments))
      .catch(console.error);
  }, []);

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
                    <th className='text-center'>Nombre</th>
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
                      <td className='text-center'>{s.Sex.TitleNaturalHose}</td>
                      <td className='text-center'>
                        {s.Services.TitleNameServices}
                      </td>
                      <td className='text-center'>
                        {s.Services.NaturalHose.join(',')}
                      </td>
                      <td className='text-center'>{s.Need}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className='card-footer'>
            <div className='text-right'>
              <button
                disabled={
                  !sendWsContacts.customMessage ||
                  (shiptmet.length === 0 && !sendWsContacts.sendWsContacts)
                }
                className={`btn btn-primary mr-1 ${
                  isSending ? 'disabled btn-progress' : ''
                }`}
                onClick={handleSendBulkMessages}
              >
                Envíar Mensajes
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default DetailTablePage;
