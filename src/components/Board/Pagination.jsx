import React from 'react';
import {
  PaginationContainer,
  PaginationButton,
} from '../../styles/board/pagination';

import NextButton from '../../assets/images/nextButton.svg';
import PrevButton from '../../assets/images/prevButton.svg';
import DisabledNextButton from '../../assets/images/disabled-next.svg'; // 비활성화된 다음 버튼
import DisabledPrevButton from '../../assets/images/disabled-prev.svg'; // 비활성화된 이전 버튼

const Pagination = ({
  page,
  total, // 전체 페이지 수
  startPage, // 현재 보여지는 첫 번째 페이지 번호
  endPage, // 현재 보여지는 마지막 페이지 번호
  prev, // 이전 버튼 활성화 여부
  next, // 다음 버튼 활성화 여부
  onPageChange, // 페이지 변경 핸들러
  onNextGroup, // 다음 페이지 그룹으로 이동하는 함수
  onPrevGroup, // 이전 페이지 그룹으로 이동하는 함수
}) => {
  // 총 페이지 수를 계산 (endPage와 startPage의 차이로)
  const totalPages = endPage - startPage + 1;

  return (
    <PaginationContainer>
      {/* 이전 그룹 버튼 */}
      <PaginationButton onClick={onPrevGroup} disabled={startPage === 1}>
        <img
          src={startPage === 1 ? DisabledPrevButton : PrevButton}
          alt="왼쪽 화살표 아이콘"
          width={10}
          height={10}
        />
      </PaginationButton>

      {/* 페이지 번호 렌더링 */}
      {totalPages > 0 &&
        [...Array(totalPages)].map((_, index) => (
          <PaginationButton
            key={startPage + index}
            onClick={() => onPageChange(startPage + index)}
            active={page === startPage + index ? 'true' : 'false'}
          >
            {startPage + index}
          </PaginationButton>
        ))}

      {/* 다음 그룹 버튼 */}
      <PaginationButton onClick={onNextGroup} disabled={endPage >= total}>
        <img
          src={endPage >= total ? DisabledNextButton : NextButton}
          alt="오른쪽 화살표 아이콘"
          width={10}
          height={10}
        />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
