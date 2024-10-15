import React from 'react';
import styled from 'styled-components';
import BoardDetailContainer from '../../components/Board/BoardDetailContainer';
import MapComponent from '../../components/MapComponent';

const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const Detail = () => {
  return (
    <Container>
      {/* 지도 컴포넌트 */}
      <MapComponent />

      {/* BoardDetailContainer로 분리된 오버레이 박스 */}
      <BoardDetailContainer />
    </Container>
  );
};

export default Detail;
