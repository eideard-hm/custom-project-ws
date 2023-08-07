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
} from '../../types';

const initialState: IShipmentOrdersCreateInput = {
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
  EconomicActivity: null,
  serviceCode: '',
  naturalHose: '',
};

function FormUserDataPage() {
  const [isSending, setIsSending] = useState(false);
  const [selectedService, setSelectedService] = useState<ISelectedServie>({
    code: '',
    id: '',
    label: '',
  });
  const [sexs, setSexs] = useState<ISex[]>([]);
  const [peopleLocation, setPeopleLocation] = useState<IService[]>([]);
  const [naturalHoses, setNaturalHoses] = useState<INaturalHoseByService[]>([]);
  const { dirty, handleSubmit, handleChange, setFieldValue, values, isValid } =
    useFormik({
      initialValues: initialState,
      onSubmit: async (values, { resetForm }) => {
        if (!isValid || !values.ServicesId) {
          toast.error(
            'Debe de llenar los campos del formulario correctamente!'
          );
          return;
        }

        values.EconomicActivity =
          values.serviceCode && values.serviceCode === OTR_SERVICE_CODE
            ? Number(values.naturalHose)
            : null;
        values.HouseId =
          values.serviceCode && values.serviceCode === UBI_SERVICE_CODE
            ? Number(values.naturalHose)
            : null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { serviceCode, naturalHose, ...objectValues } = values;

        setIsSending(true);
        const { Id } = await createShipmentOrders(objectValues);
        if (Id === 0) {
          toast.error(
            'Ocurrió un error al momento de insertar el registro. Intente nuevamente.'
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
    getLocations()
      .then((location) => setPeopleLocation(location))
      .catch(console.error);

    retrieveSexs()
      .then((sex) => setSexs(sex))
      .catch(console.error);
  };

  const handlePeopleLocation = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e) return;

    const index = e.target.selectedIndex;
    const label = e.target[index].textContent ?? '';
    const [serviceId, code] = e.target.value.split('-');
    const servicesCode = e.target[index].getAttribute('data-type');
    await setFieldValue('serviceCode', servicesCode);

    if (Number(serviceId ?? 0) > 0) {
      setSelectedService({ label, id: serviceId, code });
      getNaturalHoses(serviceId);
      return;
    }
    setSelectedService({ label: '', id: '', code: '' });
  };

  const getNaturalHoses = async (serviceId: string) => {
    const naturalHouse = await retrieveNaturalHoses(serviceId);
    setNaturalHoses(naturalHouse);
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
                  <label>Nombre:</label>
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
                  <label>Número Teléfono: </label>
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
                    />
                  </div>
                </div>

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

                {selectedService.id && (
                  <div className='form-group'>
                    <label>{selectedService.label}:</label>
                    <select
                      className='form-control'
                      name='naturalHose'
                      onChange={handleChange}
                      value={values.naturalHose}
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
                  <label>Apellidos:</label>
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

                <div className='form-group'>
                  <label>
                    Ubicación Persona <span className='mandatory'>*</span> :
                  </label>
                  <select
                    className='form-control'
                    name='ServicesId'
                    onChange={async (e) => {
                      handleChange(e);
                      await handlePeopleLocation(e);
                    }}
                  >
                    <option
                      value=''
                      data-type=''
                    >
                      -- Seleccione un servicio --
                    </option>
                    {peopleLocation.map(({ Id, TitleNameServices, Type }) => (
                      <option
                        key={Id}
                        value={Id}
                        data-type={Type}
                      >
                        {TitleNameServices}
                      </option>
                    ))}
                  </select>
                </div>
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
