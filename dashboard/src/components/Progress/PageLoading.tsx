import React from 'react';
import Flex from '../Utils/Flex/Flex';
import Spinner from './Spinner';

function PageLoading() {
  return (
    <Flex justify="center" items="center" className="py-30">
      <div className="card">
        <Flex items="center" gap="10px">
          <Spinner color="primary" />
          <div className="fs-18 semi-bold">Chargement ...</div>
        </Flex>
      </div>
    </Flex>
  );
}

export default PageLoading;
