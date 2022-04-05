import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { sessionKeys, _defaultUser } from '../libs';
import { logout } from '../libs/auth';
import { userStateAtom } from '../providers/store/atoms/user.atom';
import { IUser } from '../types/login.types';

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [auth, setAuth] = useState<IUser>(_defaultUser);
  const [userState, setUserState] = useRecoilState(userStateAtom);

  useEffect(() => {
    if (userState.id !== '') {
      setAuth(userState);
    } else {
      const session = JSON.parse(
        sessionStorage.getItem(sessionKeys.user) ?? '{"id": ""}'
      );

      if (session !== '' && session.id !== '') {
        setAuth(session);
        setUserState(session);
      } else {
        logout();
        navigate('/');
      }
    }
    setLoading(false);
  }, [userState]);

  return [loading, auth];
}
