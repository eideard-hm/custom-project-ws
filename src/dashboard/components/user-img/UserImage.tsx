import { useAuthContext } from '../../../hooks';
import { DefaultImage } from '../../../shared/components';

export function UserImage() {
  const {
    userData: { fullName, userImage },
  } = useAuthContext();

  return userImage ? (
    <img
      alt={`Imagen de perfil ${fullName}`}
      src={userImage}
      className='user-img-radious-style'
    />
  ) : (
    <DefaultImage />
  );
}
