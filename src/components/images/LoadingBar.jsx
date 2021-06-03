import React from 'react';
import { LinearProgress } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { green } from '../../global/colors';

const LoadingBar = () => {
  const isLoading = useSelector((state) => state.core.isLoading);
  return <>{isLoading && <LinearProgress color={green} />}</>;
};

export default LoadingBar;
