export function FormUserData() {
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header'>
            <h4>Ingresar Registros en Base de Datos</h4>
          </div>
          <div className='card-body row'>
            <div className='col-6'>
              <div className='form-group'>
                <label>Tipo Documento</label>
                <select
                  className='form-control'
                  name='DocumentType'
                >
                  <option value='C.C'>Cédula de Ciudadanía</option>
                  <option value='T.I'>Tarjeta de Identidad</option>
                  <option value='P.E'>Pasaporte</option>
                </select>
              </div>
              <div className='form-group'>
                <label>Nombre:</label>
                <input
                  type='text'
                  className='form-control'
                  name='firstName'
                  placeholder='Jhon'
                />
              </div>
              <div className='form-group'>
                <label>Apellidos:</label>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  placeholder='Doe'
                />
              </div>
              <div className='form-group'>
                <label>Email:</label>
                <input
                  type='email'
                  className='form-control'
                  name='Edier'
                  placeholder='example@example.com'
                />
              </div>
              <div className='form-group'>
                <label>Genero: </label>
                <div className='custom-switches-stacked mt-2'>
                  <label className='custom-switch'>
                    <input
                      type='radio'
                      name='sexId'
                      value='Hombre'
                      className='custom-switch-input'
                      defaultChecked={true}
                    />
                    <span className='custom-switch-indicator'></span>
                    <span className='custom-switch-description'>Hombre</span>
                  </label>
                  <label className='custom-switch'>
                    <input
                      type='radio'
                      name='sexId'
                      value='Mujer'
                      className='custom-switch-input'
                    />
                    <span className='custom-switch-indicator'></span>
                    <span className='custom-switch-description'>Mujer</span>
                  </label>
                  <label className='custom-switch'>
                    <input
                      type='radio'
                      name='sexId'
                      value='otro'
                      className='custom-switch-input'
                    />
                    <span className='custom-switch-indicator'></span>
                    <span className='custom-switch-description'>Otro</span>
                  </label>
                </div>
              </div>
              <div className='form-group'>
                <label>Fecha Nacimiento:</label>
                <input
                  type='date'
                  className='form-control datepicker'
                  name='birthDate'
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
                    name='phone'
                    placeholder='3XXXXXXXXX'
                  />
                </div>
              </div>
              <div className='form-group'>
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
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <label>Ubicación: </label>
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
                    <span className='custom-switch-description'>Rural</span>
                  </label>
                  <label className='custom-switch'>
                    <input
                      type='radio'
                      name='option'
                      value='2'
                      className='custom-switch-input'
                    />
                    <span className='custom-switch-indicator'></span>
                    <span className='custom-switch-description'>Urbano</span>
                  </label>
                </div>
              </div>
              <div className='form-group'>
                <label>Caracterización:</label>
                <div className='custom-switches-stacked mt-2'>
                  <label className='custom-switch'>
                    <input
                      type='radio'
                      name='need'
                      value='Alimentación'
                      className='custom-switch-input'
                      defaultChecked={true}
                    />
                    <span className='custom-switch-indicator'></span>
                    <span className='custom-switch-description'>
                      Alimentación
                    </span>
                  </label>
                  <label className='custom-switch'>
                    <input
                      type='radio'
                      name='need'
                      value='Solicitud Vivienda'
                      className='custom-switch-input'
                    />
                    <span className='custom-switch-indicator'></span>
                    <span className='custom-switch-description'>
                      Solicitud Vivienda
                    </span>
                  </label>
                  <label className='custom-switch'>
                    <input
                      type='radio'
                      name='need'
                      value='Solicitud Insumos'
                      className='custom-switch-input'
                    />
                    <span className='custom-switch-indicator'></span>
                    <span className='custom-switch-description'>
                      Solicitud Insumos
                    </span>
                  </label>
                </div>
              </div>
              <div className='form-group'>
                <label>Vereda</label>
                <select
                  className='form-control'
                  name='sidewalk'
                >
                  <option value='Otanche'>Otanche</option>
                  <option value='Las Quinchas'>Las Quinchas</option>
                  <option value='Option 3'>Option 3</option>
                </select>
              </div>
              <div className='form-group'>
                <label>Dirección: </label>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='ubication'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
