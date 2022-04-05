import React from 'react';
import Flex from '../Utils/Flex/Flex';
import Spinner from './Spinner';

function PageLoading() {
  return (
    <Flex
      justify="center"
      items="center"
      className="fixed top-0 left-0 w-page h-page"
    >
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
