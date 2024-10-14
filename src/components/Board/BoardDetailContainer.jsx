import React from 'react';
import { DetailWrapper } from '../../styles/board/boardDetailContainer'; // 변경된 styled-components import
import TabContainer from './TabContainer';

const BoardDetailContainer = () => {
  return (
    <DetailWrapper>
      <TabContainer />
    </DetailWrapper>
  );
};

export default BoardDetailContainer;
