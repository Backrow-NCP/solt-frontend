import React from 'react';
import { BoardBox } from '../../styles/board/boardList';

const BoardItem = ({ title, content }) => {
  return (
    <BoardBox>
      <h3>{title}</h3>
      <p>{content}</p>
    </BoardBox>
  );
};

export default BoardItem;
