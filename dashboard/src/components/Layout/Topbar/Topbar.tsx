import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/Logo_white.png';
import { logout } from '../../../services/libs';
import { IUser } from '../../../services/types/login.types';
import Button from '../../Buttons/Button';
import Dropdown from '../../Dropdowns/Dropdown';
import SvgChevronDown from '../../Svgs/SvgChevronDown';
import SvgUserCircle from '../../Svgs/SvgUserCircle';
import Flex from '../../Utils/Flex/Flex';

function Topbar({
  user,
  children = <></>,
}: {
  user: IUser;
  children?: ReactElement;
}) {
  const navigate = useNavigate();

  function _logout() {
    logout();
    navigate('/');
  }

  return (
    <Flex
      className="bg-primary px-16"
      justify="between"
      items="center"
      style={{ height: '60px' }}>
      <img height="32" src={logo} alt="LOGO" />
      <Flex gap="50px" items="center">
        <div>{children}</div>
        <Flex gap="15px">
          <SvgUserCircle />
          <Dropdown
            dropdown={
              <Button onClick={_logout} outlined>
                Logout
              </Button>
            }>
            <Flex items="center" gap="20px" className="cursor-pointer">
              <div>
                <div className="fs-16 text-white bold">{user.username}</div>
                <div className="fs-12 text-white">{user.role}</div>
              </div>
              <SvgChevronDown />
            </Flex>
          </Dropdown>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Topbar;
