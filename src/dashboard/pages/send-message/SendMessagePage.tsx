import { useEffect, useState, type ChangeEvent } from 'react';

import { useFormik } from 'formik';

import { needs } from '../../../data';
import { Card } from '../../../shared/components';
import { AttachedFile } from '../../components';
import type { INaturalHoseByService, IService, ISex } from '../../types';
import {
  getLocations,
  retrieveNaturalHoses,
  retrieveSexs,
} from '../../services';
import type { IUserDataMaestros } from '../../../types';

function SendMessagePage() {
  const [selectedService, setSelectedService] = useState<IUserDataMaestros>({
    name: '',
    value: '',
  });
  const [, setSexs] = useState<ISex[]>([]);
  const [naturalHoses, setNaturalHoses] = useState<INaturalHoseByService[]>([]);
  const [peopleLocation, setPeopleLocation] = useState<IService[]>([]);
  const { dirty, handleChange, handleSubmit } = useFormik({
    initialValues: {},
    enableReinitialize: true,
    onSubmit(values) {
      console.log({ values });
    },
  });

  useEffect(() => {
    initServices();
  }, []);

  const initServices = () => {
    getLocations()
      .then((location) => setPeopleLocation(location))
      .catch(console.error);

    retrieveSexs()
      .then((sex) => setSexs(sex))
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

  return (
    <section className='send-messages-page'>
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
                <div className='form-group'>
                  <label>Genero: </label>
                  <div className=' mt-2'>
                    <label className='custom-switch'>
                      <input
                        type='radio'
                        name='SexId'
                        value='Hombre'
                        className='custom-switch-input'
                        defaultChecked={true}
                        onChange={handleChange}
                      />
                      <span className='custom-switch-indicator'></span>
                      <span className='custom-switch-description'>Hombre</span>
                    </label>
                    <label className='custom-switch'>
                      <input
                        type='radio'
                        name='SexId'
                        value='Mujer'
                        className='custom-switch-input'
                        onChange={handleChange}
                      />
                      <span className='custom-switch-indicator'></span>
                      <span className='custom-switch-description'>Mujer</span>
                    </label>
                    <label className='custom-switch'>
                      <input
                        type='radio'
                        name='SexId'
                        value='Otro'
                        className='custom-switch-input'
                        onChange={handleChange}
                      />
                      <span className='custom-switch-indicator'></span>
                      <span className='custom-switch-description'>Otro</span>
                    </label>
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
            </form>
          </section>

          <div className='card-footer text-right'>
            <AttachedFile />
            <button
              className='btn btn-icon icon-left btn-success'
              type='submit'
              disabled={!dirty}
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
