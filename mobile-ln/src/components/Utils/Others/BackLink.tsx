import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgArrowLeft from '../../Svgs/SvgArrowLeft';
import Flex from '../Flex/Flex';

function BackLink() {
  const navigate = useNavigate();

  const handleClick = () => navigate(-1);

  return (
    <Flex
      items="center"
      gap="15px"
      className="cursor-pointer"
      onClick={handleClick}
    >
      <SvgArrowLeft color="#085A03" />
      <div className="text-primary semi-bold fs-16">Retour</div>
    </Flex>
  );
}

export default BackLink;
