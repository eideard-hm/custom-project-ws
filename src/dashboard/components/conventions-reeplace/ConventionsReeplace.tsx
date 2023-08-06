export function ConventionsReeplace() {
  return (
    <div className='form-group'>
    <h6>! Convenciones para reemplazar la información !</h6>
    <div className='d-flex'>
      <div className='col-3'>
        <button
          type='button'
          className='btn btn-primary'
        >
          Nombre del receptor{' '}
          <span className='badge badge-transparent'>
            {'{name}'}
          </span>
        </button>
      </div>
      <div className='col-3'>
        <button
          type='button'
          className='btn btn-warning'
        >
          Apellidos del receptor{' '}
          <span className='badge badge-transparent'>
            {'{lastname}'}
          </span>
        </button>
      </div>
      <div className='col-3'>
        <button
          type='button'
          className='btn btn-success'
        >
          Nombres del usuario en sesión{' '}
          <span className='badge badge-transparent'>
            {'{user}'}
          </span>
        </button>
      </div>
      <div className='col-3'>
        <button
          type='button'
          className='btn btn-dark'
        >
          Ubicación usuario en sesión{' '}
          <span className='badge badge-transparent'>
            {'{location}'}
          </span>
        </button>
      </div>
    </div>
  </div>
  );
}
