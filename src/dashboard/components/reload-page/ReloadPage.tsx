export function ReloadPage() {
  return (
    <button
      className={`btn btn-icon icon-left btn-success`}
      type='submit'
      onClick={() => window.location.reload()}
    >
      <i className='fa-solid fa-rotate mr-2'></i>
      Refrescar página
    </button>
  );
}
