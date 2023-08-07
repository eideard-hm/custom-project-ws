import { useAuthContext } from '../../../hooks';
import { DefaultImage } from '../../../shared/components';

export function UserImage() {
  const {
    userData: { fullName, userImage },
  } = useAuthContext();

  return userImage ? (
    <img
      alt={`Imagen de perfil ${fullName}`}
      height={30}
      width={30}
      src={userImage}
      className='user-img-radious-style'
    />
  ) : (
    <DefaultImage />
  );
}
