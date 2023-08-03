import { useContext } from 'react';

import { AuthContext } from '../../../context';
import { DefaultImage } from '../../../shared/components';

export function UserProfile() {
  const {
    userData: { fullName, userImage },
  } = useContext(AuthContext);
  return (
    <div className='sidebar-brand'>
      <a href='#'>
        {userImage ? (
          <img
            alt={`Imagen de perfil ${fullName}`}
            src={userImage}
            className='header-logo'
          />
        ) : (
          <DefaultImage />
        )}
        <span className='logo-name'>{fullName}</span>
      </a>
    </div>
  );
}
