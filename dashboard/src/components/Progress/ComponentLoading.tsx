import React from 'react';
import Flex from '../Utils/Flex/Flex';
import Spinner from './Spinner';

function ComponentLoading() {
  return (
    <Flex justify="center" items="center" className="py-30">
      <Spinner color="primary" />
    </Flex>
  );
}

export default ComponentLoading;
