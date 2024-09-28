import React from 'react';
import BoardList from './BoardList';

const ExamplePage = () => {
  const boardItems = [
    { title: '게시글 1', content: '내용 1' },
    { title: '게시글 2', content: '내용 2' },
    { title: '게시글 3', content: '내용 3' },
    // 더 많은 게시글...
  ];

  return (
    <div>
      <h2>게시글 목록</h2>
      <BoardList items={boardItems} />
    </div>
  );
};

export default ExamplePage;
