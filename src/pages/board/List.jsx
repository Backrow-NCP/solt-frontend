import React from 'react';
import BoardList from '../../components/Board/BoardList';
import BestBoardList from '../../components/Board/BestBoardList';

const List = () => {
  const boardItems = [
    { title: '게시글 1', content: '내용 1' },
    { title: '게시글 2', content: '내용 2' },
    { title: '게시글 3', content: '내용 3' },
    { title: '게시글 4', content: '내용 4' },
    { title: '게시글 5', content: '내용 5' },
    { title: '게시글 6', content: '내용 6' },
  ];

  return (
    <div className="inner">
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>BEST 게시글</h2>
      <BestBoardList />
      <h2
        style={{
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        플랜 자랑하기
      </h2>
      <BoardList items={boardItems} />
    </div>
  );
};

export default List;
