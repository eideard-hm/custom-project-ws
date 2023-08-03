import { useContext } from 'react';

import { AuthContext } from '../../../context';
import { UserImage } from '../user-img/UserImage';

export function UserProfile() {
  const {
    userData: { fullName },
  } = useContext(AuthContext);
  return (
    <div className='sidebar-brand'>
      <a href='#'>
        <UserImage />
        <span className='logo-name'>{fullName}</span>
      </a>
    </div>
  );
}
