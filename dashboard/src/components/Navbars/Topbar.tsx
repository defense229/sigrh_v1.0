import React from 'react';
import Flex from '../Utils/Flex/Flex';
import logo from '../../assets/img/Logo_white.png';
import { IUser } from '../../services/types/login.types';

function Topbar({ user }: { user: IUser }) {
  return (
    <Flex
      className="bg-primary px-16"
      justify="between"
      items="center"
      style={{ height: '60px' }}
    >
      <img height="32" src={logo} alt="LOGO" />
      <div>
        <Flex items="center">
          <div>
            <div className="fs-16 text-white bold">{user.username}</div>
            <div className="fs-12 text-white">{user.role}</div>
          </div>
        </Flex>
      </div>
    </Flex>
  );
}

export default Topbar;
