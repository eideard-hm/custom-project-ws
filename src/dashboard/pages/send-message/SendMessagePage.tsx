import { useFormik } from 'formik';

import { needs } from '../../../data';
import { Card } from '../../../shared/components';
import { AttachedFile } from '../../components';

function SendMessagePage() {
  const { dirty, handleChange, handleSubmit} = useFormik({
    initialValues: {},
    enableReinitialize: true,
    onSubmit(values) {
      console.log({ values });
    },
  });

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
                </div>
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

                <div className='form-group'>
                  <label>Vereda</label>
                  <select
                    className='form-control'
                    name='Sidewalk'
                    onChange={handleChange}
                  >
                    <option value='Otanche'>Otanche</option>
                    <option value='Las Quinchas'>Las Quinchas</option>
                    <option value='Option 3'>Option 3</option>
                  </select>
                </div>
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
