import React from 'react';

import Curtain from './Curtain';
import PollCatLogo from '../images/PollCatLogo';

const PollCatCurtain = ({ color, height }) => (
  <Curtain color={color} height={height}>
    <PollCatLogo />
  </Curtain>
);

export default PollCatCurtain;
