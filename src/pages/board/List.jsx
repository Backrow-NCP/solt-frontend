import React from 'react';
import BoardList from '../../components/Board/BoardList';

const List = () => {
  return (
    <div className="inner">
      <h2
        style={{
          textAlign: 'center',
        }}
      >
        BEST 게시글
      </h2>
      <h2
        style={{
          textAlign: 'center',
        }}
      >
        플랜 자랑하기
      </h2>

      <BoardList></BoardList>
    </div>
  );
};

export default List;
