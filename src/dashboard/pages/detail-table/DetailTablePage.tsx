import { useEffect, useState } from 'react';

import { getAllShipmentOrdersAsync } from '../../services';
import type { ShipmentOrdersResponse } from '../../types';

function DetailTablePage() {
  const [shiptmet, setShiptmet] = useState<ShipmentOrdersResponse[]>([]);
  const [filterShiptment, setFilterShiptment] = useState<string>('');

  useEffect(() => {
    getAllShipmentOrdersAsync()
      .then((shipments) => setShiptmet(shipments))
      .catch(console.error);
  }, []);

  const filteresShiptments = filterShiptment
    ? shiptmet.filter(({ FullName }) =>
        FullName.toLocaleLowerCase().includes(
          filterShiptment.toLocaleLowerCase()
        )
      )
    : shiptmet;

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
                    placeholder='Buscar usuarios...'
                    onChange={(e) => setFilterShiptment(e.currentTarget.value)}
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
                <thead>
                  <tr>
                    <th className='text-center'>Nombre</th>
                    <th className='text-center'>Email</th>
                    <th className='text-center'>Teléfono</th>
                    <th className='text-center'>Fecha Nacimiento</th>
                    <th className='text-center'>Tipo Documento</th>
                    <th className='text-center'>Genero</th>
                    <th className='text-center'>Ubicación</th>
                    <th className='text-center'>Dirección</th>
                    <th className='text-center'>Actividad Económica</th>
                    <th className='text-center'>Nicho</th>
                  </tr>
                </thead>
                <tbody>
                  {filteresShiptments.map((s) => (
                    <tr key={s.Id}>
                      <td className='text-center'>{s.FullName}</td>
                      <td className='text-center'>{s.Email}</td>
                      <td className='text-center'>{s.Phone}</td>
                      <td className='text-center'>
                        {s.BirthDate
                          ? new Date(s.BirthDate).toLocaleDateString()
                          : ''}
                      </td>
                      <td className='text-center'>{s.DocumentType}</td>
                      <td className='text-center'>{s.Sex.TitleNaturalHose}</td>
                      <td className='text-center'>
                        {s.Services.TitleNameServices}
                      </td>
                      <td className='text-center'>
                        {s.NaturalHose?.TitleNaturalHose}
                      </td>
                      <td className='text-center'>
                        {
                          s.Services_ShipmentOrders_ServiceActivityIdToServices
                            ?.TitleNameServices
                        }
                      </td>
                      <td className='text-center'>
                        {
                          s
                            .NaturalHose_ShipmentOrders_EconomicActivityToNaturalHose
                            ?.TitleNaturalHose
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailTablePage;
