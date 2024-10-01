// BoardList.jsx
import React from 'react';
import { BoardContainer, BoardBox } from '../../styles/board/boardList';

const BoardList = ({ items = [] }) => {
  // 기본값으로 빈 배열 설정
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        게시글이 없습니다.
      </h3>
    );
  }

  return (
    <BoardContainer>
      {items.map((item, index) => (
        <BoardBox key={index}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </BoardBox>
      ))}
    </BoardContainer>
  );
};

export default BoardList;
