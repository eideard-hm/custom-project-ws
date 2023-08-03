import { useFormik } from 'formik';

import { RouteComponentProps } from '@reach/router';
import toast from 'react-hot-toast';

import { documentTypes, needs } from '../../../data';
import { createShipmentOrders } from '../../services';
import type { ShipmentOrdersCreateInput } from '../../types';

const initialState: ShipmentOrdersCreateInput = {
  FirstName: '',
  LastName: '',
  FromCityCode: '',
  SexId: 'Hombre',
  Sidewalk: '',
  Ubication: 'Urbano',
  BirthDate: '',
  DocumentId: null,
  DocumentType: 'C.C',
  Email: '',
  Need: '',
  Phone: '',
  ModifyUserId: '',
};

function FormUserDataPage(props: RouteComponentProps) {
  const { dirty, handleSubmit, handleChange, values, isValid } = useFormik({
    initialValues: initialState,
    onSubmit: async (values, { resetForm }) => {
      if (!isValid) return;

      const { Id } = await createShipmentOrders({ ...values });
      if (Id === 0) {
        toast.error(
          'Ocurrió un error al momento de insertar el registro. Intente nuevamente.'
        );
        return;
      }

      resetForm();
      toast.success(`Se creó el registro con el Id: ${Id}`);
    },
  });

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
                    placeholder='example@example.com'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Genero: </label>
                  <div className='custom-switches-stacked mt-2'>
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
                {/* <div className='form-group'>
                    <label>¿ Posee WhatsApp ?: </label>
                    <div className='custom-switches-stacked mt-2'>
                      <label className='custom-switch'>
                        <input
                          type='radio'
                          name='option'
                          value='1'
                          className='custom-switch-input'
                          defaultChecked={true}
                        />
                        <span className='custom-switch-indicator'></span>
                        <span className='custom-switch-description'>Sí</span>
                      </label>
                      <label className='custom-switch'>
                        <input
                          type='radio'
                          name='option'
                          value='2'
                          className='custom-switch-input'
                        />
                        <span className='custom-switch-indicator'></span>
                        <span className='custom-switch-description'>No</span>
                      </label>
                    </div>
                  </div> */}
                <div className='form-group'>
                  <label>Ubicación: </label>
                  <div className='custom-switches-stacked mt-2'>
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
                  <label>Caracterización:</label>
                  <select
                    className='form-control'
                    name='Need'
                    onChange={handleChange}
                    value={values.Need}
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
                <div className='form-group'>
                  <label>Vereda</label>
                  <select
                    className='form-control'
                    name='Sidewalk'
                    onChange={handleChange}
                    value={values.Sidewalk}
                  >
                    <option value='Otanche'>Otanche</option>
                    <option value='Las Quinchas'>Las Quinchas</option>
                    <option value='Option 3'>Option 3</option>
                  </select>
                </div>
                {/* <div className='form-group'>
                    <label>Dirección: </label>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        name='Ubication'
                      />
                    </div>
                  </div> */}
              </div>
              <div className='card-footer text-right'>
                <button
                  className='btn btn-primary mr-1'
                  type='submit'
                  disabled={!dirty}
                >
                  Submit
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
