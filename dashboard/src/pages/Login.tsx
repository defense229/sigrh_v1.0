import React, { useState } from 'react';
import Flex from '../components/Utils/Flex/Flex';
import mdn from '../assets/img/mdn_big.png';
import Input from '../components/Inputs/Input';
import Password from '../components/Inputs/Password';
import Button from '../components/Buttons/Button';
import BeninFlag from '../components/Utils/Others/BeninFlag';
import { IUser } from '../services/types/login.types';
import { _defaultUser } from '../services/libs';
import axios from 'axios';
import { config } from '../env';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userStateAtom } from '../services/providers/store/atoms/user.atom';
import { login } from '../services/libs/auth';
import Toast from '../components/Modals/Toast';

function Login() {
  const [user, setUser] = useState<IUser>(_defaultUser);
  const setUserState = useSetRecoilState(userStateAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleChange = (attr: 'username' | 'password', value: string) => {
    setUser({ ...user, [attr]: value });
  };

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await axios.post(config.api_url.sigrh + 'auth/login', {
        ...user,
      });
      const result = response.data;

      login(result.data.user);
      setUserState(result.data.user);
      setLoading(false);
      navigate('/home');
    } catch (err) {
      setHasError(true);
      setUser(_defaultUser);
      setLoading(false);
    }
  };

  return (
    <div className="mt-36">
      <Flex items="center" direction="col">
        <img src={mdn} alt="MDN" />
        <div className="fs-32 mt-8 semi-bold text-center mdn-title">
          Ministère de la Défense Nationale
        </div>
        <div className="card" style={{ minWidth: '35%' }}>
          <div className="fs-18 bold text-center mb-16">
            Veuillez saisir vos identifiants
          </div>
          <form onSubmit={handleSubmit}>
            <Flex direction="col" gap="12px">
              <Input
                value={user.username}
                onChange={(e) => handleChange('username', e.target.value)}
                label="Identifiant"
              />
              <Password
                value={user.password}
                onChange={(e) => handleChange('password', e.target.value)}
                label="Mot de passe"
              />
              <Button expand loading={loading}>
                Se connecter
              </Button>
            </Flex>
          </form>
        </div>
      </Flex>
      <div className="fixed w-full bottom-0 left-0">
        <BeninFlag />
      </div>
      <Toast
        color="danger"
        xpos="right"
        ypos="top"
        open={hasError}
        onClose={() => setHasError(false)}
      >
        <b>Identifiants incorrects</b>
      </Toast>
    </div>
  );
}

export default Login;
