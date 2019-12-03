import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

export default function LoadingIndicator() {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <Container>
        <Loader type="ThreeDots" color="#333" height="100" width="100" />
      </Container>
    )
  );
}
