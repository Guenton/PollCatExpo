import React from 'react';
import { useSelector } from 'react-redux';
import i18n from 'i18n-js';

import Curtain from './Curtain';
import PollCatLogo from '../images/PollCatLogo';
import Header from '../labels/Header';

const MainCurtain = ({ view, color, height }) => {
  const { t } = i18n;
  const firstName = useSelector((state) => state.user.firstName);
  
  return (
    <Curtain color={color} height={height}>
      {view === 'main' && (<Header label={t('hiName', { name: firstName })} />)}

      {view === 'rank' && (<Header label={t('rankHeader')} />)}

      {view === 'setup' && (<Header label={t('setupHeader')} />)}
      {view === 'create' && (<Header label={t('createPollHeader')} />)}
      {view === 'edit' && (<Header label={t('editPollHeader')} />)}
      {view === 'delete' && (<Header label={t('deletePollHeader')} />)}
    </Curtain>
  );
};


export default MainCurtain;
