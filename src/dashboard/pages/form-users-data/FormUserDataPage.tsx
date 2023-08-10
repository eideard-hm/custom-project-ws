import { useEffect, useState, type ChangeEvent } from 'react';

import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import { documentTypes } from '../../../data';
import { OTR_SERVICE_CODE, UBI_SERVICE_CODE } from '../../../utils';
import {
  createShipmentOrders,
  getLocations,
  retrieveNaturalHoses,
  retrieveSexs,
} from '../../services';
import type {
  INaturalHoseByService,
  ISelectedServie,
  IService,
  ISex,
  IShipmentOrdersCreateInput,
  ShipmentOrdersCreateInput,
} from '../../types';

const initialState: ShipmentOrdersCreateInput = {
  FirstName: '',
  LastName: '',
  SexId: '2',
  Sidewalk: '',
  BirthDate: '',
  DocumentType: 'CC',
  Email: '',
  Need: null,
  Phone: '',
  ServicesId: '',
  EconomicActivity: '',
  HouseId: '',
  ServiceActivityId: '',
};

function FormUserDataPage() {
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
  const [peopleLocation, setPeopleLocation] = useState<IService[]>([]);
  const [economySectors, setEconomySectors] = useState<IService[]>([]);
  const [naturalHoses, setNaturalHoses] = useState<INaturalHoseByService[]>([]);
  const [naturalHosesEcoSector, setNaturalHosesEcoSector] = useState<
    INaturalHoseByService[]
  >([]);
  const { dirty, handleSubmit, handleChange, values, isValid } = useFormik({
    initialValues: initialState,
    onSubmit: async (values, { resetForm }) => {
      if (
        !isValid ||
        !values.ServicesId ||
        !values.FirstName ||
        !values.LastName ||
        !values.SexId ||
        !values.ServicesId
      ) {
        toast.error('Debe de llenar los campos del formulario correctamente!');
        return;
      }

      setIsSending(true);
      const valuesToSend: IShipmentOrdersCreateInput = { ...values };
      valuesToSend.DocumentType = valuesToSend.DocumentType || null;
      valuesToSend.BirthDate = valuesToSend.BirthDate || null;
      valuesToSend.Email = valuesToSend.Email || null;
      valuesToSend.HouseId = valuesToSend.HouseId || null;
      valuesToSend.EconomicActivity = valuesToSend.EconomicActivity || null;
      valuesToSend.ServiceActivityId = valuesToSend.ServiceActivityId || null;

      const { Id } = await createShipmentOrders({ ...valuesToSend });
      if (Id === 0) {
        toast.error(
          'Ocurrió un error al momento de insertar el registro. Intente nuevamente.'
        );
        toast.error(
          'Verifique que el número de teléfono ingresado no exista. Intente nuevamente.'
        );
      } else {
        resetForm();
        toast.success(`Se creó el registro con el Id: ${Id}`);
      }

      setIsSending(false);
    },
  });

  useEffect(() => initServices(), []);

  const initServices = () => {
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

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h4>Ingresar Registros en Base de Datos</h4>
          </div>
          <section className='card-body'>
            <form
              onSubmit={handleSubmit}
              className=' row'
            >
              <div className='col-6'>
                <div className='form-group'>
                  <label>Tipo Documento</label>
                  <select
                    className='form-control'
                    name='DocumentType'
                    onChange={handleChange}
                    value={values.DocumentType}
                  >
                    {documentTypes.map(({ name, value }, i) => (
                      <option
                        key={i}
                        value={value}
                      >
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group'>
                  <label>
                    Nombre <span className='mandatory'>*</span> :
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='FirstName'
                    placeholder='Jhon'
                    onChange={handleChange}
                    value={values.FirstName}
                  />
                </div>

                <div className='form-group'>
                  <label>
                    Número Teléfono <span className='mandatory'>*</span>:{' '}
                  </label>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <div className='input-group-text'>57</div>
                    </div>
                    <input
                      type='text'
                      className='form-control phone-number'
                      name='Phone'
                      placeholder='3XXXXXXXXX'
                      onChange={handleChange}
                      value={values.Phone}
                      maxLength={10}
                      minLength={10}
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label>
                    Ubicación Persona <span className='mandatory'>*</span> :
                  </label>
                  <select
                    className='form-control'
                    name='ServicesId'
                    value={values.ServicesId}
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

                <div className='form-group'>
                  <label>Actividad Económica :</label>
                  <select
                    className='form-control'
                    name='ServiceActivityId'
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

                <div className='form-group'>
                  <label>
                    Genero <span className='mandatory'>*</span> :
                  </label>
                  <div className='mt-3'>
                    {sexs.map(({ Id, TitleNaturalHose }) => (
                      <label
                        className='custom-switch'
                        key={Id}
                      >
                        <input
                          type='radio'
                          name='SexId'
                          value={Id}
                          className='custom-switch-input'
                          onChange={handleChange}
                          checked={String(Id) === values.SexId}
                        />
                        <span className='custom-switch-indicator'></span>
                        <span className='custom-switch-description'>
                          {TitleNaturalHose}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className='col-6'>
                <div className='form-group'>
                  <label>Fecha Nacimiento:</label>
                  <input
                    type='date'
                    className='form-control datepicker'
                    name='BirthDate'
                    onChange={handleChange}
                    value={values.BirthDate}
                  />
                </div>

                <div className='form-group'>
                  <label>
                    Apellidos <span className='mandatory'>*</span> :
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='LastName'
                    placeholder='Doe'
                    onChange={handleChange}
                    value={values.LastName}
                  />
                </div>

                <div className='form-group'>
                  <label>Email:</label>
                  <input
                    type='email'
                    className='form-control'
                    name='Email'
                    value={values.Email}
                    placeholder='example@example.com'
                    onChange={handleChange}
                  />
                </div>

                {selectedService.id && (
                  <div className='form-group'>
                    <label>{selectedService.label}:</label>
                    <select
                      className='form-control'
                      name='HouseId'
                      onChange={handleChange}
                      value={values.HouseId}
                    >
                      <option value=''>
                        -- Seleccione un/a {selectedService.label} --
                      </option>
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

                {selectedEcoSector.id && (
                  <div className='form-group'>
                    <label>{selectedEcoSector.label}:</label>
                    <select
                      className='form-control'
                      name='EconomicActivity'
                      onChange={handleChange}
                      value={values.EconomicActivity}
                    >
                      <option value=''>
                        -- Seleccione un/a {selectedEcoSector.label} --
                      </option>
                      {naturalHosesEcoSector.map(({ Id, TitleNaturalHose }) => (
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

              <div className='card-footer'>
                <button
                  className={`btn btn-icon icon-left btn-success ${
                    isSending ? 'disabled btn-progress' : ''
                  }`}
                  type='submit'
                  disabled={!dirty || isSending}
                >
                  <i className='fa-solid fa-floppy-disk mr-2'></i>
                  Guardar
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FormUserDataPage;
