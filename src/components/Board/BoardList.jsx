import React, { useState } from 'react';
import { BoardContainer } from '../../styles/board/boardList';
import Pagination from './Pagination';
import BoardItem from './BoardItem';

const BoardList = ({
  boardData, // boardData를 props로 받음
  pageData,
  onNextGroup,
  onPrevGroup,
}) => {
  const [currentPage, setCurrentPage] = useState(pageData.currentPage || 1);

  // 페이지 변경 핸들러
  const onPageChange = newPage => {
    setCurrentPage(newPage);
    console.log(`페이지가 ${newPage}로 변경되었습니다.`);
    // 필요한 다른 작업을 여기서 처리할 수 있습니다.
  };

  // boardData가 없거나 비어있는 경우 메시지 출력
  if (!Array.isArray(boardData) || boardData.length === 0) {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        게시글이 없습니다.
      </h3>
    );
  }

  console.log('BoardList 보드 데이터', boardData);

  return (
    <>
      <BoardContainer>
        {boardData.map(board => (
          <BoardItem key={board.boardId} board={board} />
        ))}
      </BoardContainer>

      <Pagination
        pageData={pageData} // pageData를 전체로 넘겨줍니다.
        onPageChange={onPageChange} // 페이지 변경 핸들러
        onNextGroup={onNextGroup} // 다음 그룹 핸들러
        onPrevGroup={onPrevGroup} // 이전 그룹 핸들러
      />
    </>
  );
};

export default BoardList;
