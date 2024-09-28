// BoardList.jsx
import React from 'react';
import { BoardContainer, BoardBox } from '../../styles/board/boardList';

const BoardList = ({ items = [] }) => {
  // 기본값으로 빈 배열 설정
  if (!Array.isArray(items) || items.length === 0) {
    return <p>게시글이 없습니다.</p>; // 게시글이 없을 때 표시할 메시지
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
