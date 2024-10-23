import React from 'react';
import { BoardContainer } from '../../styles/board/boardList';
import Pagination from './Pagination';
import BoardItem from './BoardItem';

const BoardList = ({
  boardData, // boardData를 props로 받음
  pageData,
  onPageChange, // 부모로부터 받은 페이지 변경 함수
  onNextGroup,
  onPrevGroup,
}) => {
  const boardDetails = boardData.map(board => ({
    boardId: board.boardId,
    endDate: board.plan.endDate,
    startDate: board.plan.startDate,
    member: board.member,
    title: board.title,
    image: board.images,
    location: board.plan?.location,
    regDate: board.regDate,
    plan: board.plan,
    likeCount: board.likeCount,
    modDate: board.modDate,
  }));

  // boardData가 없거나 비어있는 경우 메시지 출력
  if (!Array.isArray(boardData) || boardData.length === 0) {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        게시글이 없습니다.
      </h3>
    );
  }

  return (
    <>
      <BoardContainer>
        {boardDetails.map(board => (
          <BoardItem key={board.boardId} board={board} />
        ))}
      </BoardContainer>

      <Pagination
        pageData={pageData} // pageData를 전체로 넘겨줍니다.
        onPageChange={onPageChange} // 부모로부터 받은 페이지 변경 핸들러
        onNextGroup={onNextGroup} // 다음 그룹 핸들러
        onPrevGroup={onPrevGroup} // 이전 그룹 핸들러
      />
    </>
  );
};

export default BoardList;
