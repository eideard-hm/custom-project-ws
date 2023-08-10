export function ConventionsReeplace() {
  return (
    <section className='buttons'>
      <div className='section-title mt-0'>
        ! Convenciones para reemplazar la información !
      </div>
      <button
        type='button'
        className='btn btn-primary'
      >
        Nombre del receptor{' '}
        <span className='badge badge-transparent'>{'{name}'}</span>
      </button>
      <button
        type='button'
        className='btn btn-success'
      >
        Nombres del usuario en sesión{' '}
        <span className='badge badge-transparent'>{'{user}'}</span>
      </button>
      <button
        type='button'
        className='btn btn-dark'
      >
        Ubicación usuario en sesión{' '}
        <span className='badge badge-transparent'>{'{location}'}</span>
      </button>
    </section>
  );
}
