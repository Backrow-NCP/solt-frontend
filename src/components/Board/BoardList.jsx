import React, { useState } from 'react';
import { BoardContainer, BoardBox } from '../../styles/board/boardList';
import Pagination from '../../components/Board/Pagination';

const BoardList = ({ items = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 한 페이지에 6개씩 표시

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        게시글이 없습니다.
      </h3>
    );
  }

  return (
    <>
      <BoardContainer>
        {currentItems.map((item, index) => (
          <BoardBox key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </BoardBox>
        ))}
      </BoardContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default BoardList;
