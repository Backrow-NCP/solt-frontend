import React from 'react';
import BoardDetail from '../../components/Board/BoardDetail';

const Detail = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>게시글 상세보기</h1>
      <BoardDetail />
    </div>
  );
};

export default Detail;