import React from 'react';
import styled from 'styled-components';
import TabContainer from './TabContainer';

const OverlayContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 568px;
  height: 962px;
  margin-top: 50px;
  margin-left: 10px;
  background-color: white;
  border-radius: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 10;
`;

const BoardDetailContainer = () => {
  return (
    <OverlayContainer>
      <TabContainer />
    </OverlayContainer>
  );
};

export default BoardDetailContainer;
