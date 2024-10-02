import React from 'react';
import {
  PaginationContainer,
  PaginationButton,
} from '../../styles/board/pagination';

import NextButton from '../../assets/images/nextButton.svg';
import PrevButton from '../../assets/images/prevButton.svg';
import DisabledNextButton from '../../assets/images/disabled-next.svg'; // 비활성화된 다음 버튼
import DisabledPrevButton from '../../assets/images/disabled-prev.svg'; // 비활성화된 이전 버튼

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const itemsPerPage = 10; // 페이지당 항목 수
  const totalGroups = Math.ceil(totalPages / itemsPerPage); // 그룹 수
  const currentGroup = Math.floor((currentPage - 1) / itemsPerPage); // 현재 그룹

  const handleNext = () => {
    if (currentGroup < totalGroups - 1) {
      onPageChange((currentGroup + 1) * itemsPerPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentGroup > 0) {
      onPageChange((currentGroup - 1) * itemsPerPage + 1);
    }
  };

  const startPage = currentGroup * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, totalPages);

  return (
    <PaginationContainer>
      <PaginationButton onClick={handlePrevious} disabled={currentGroup === 0}>
        <img
          src={currentGroup === 0 ? DisabledPrevButton : PrevButton}
          alt="왼쪽 화살표 아이콘"
          width={10}
          height={10}
        />
      </PaginationButton>

      {[...Array(endPage - startPage + 1)].map((_, index) => (
        <PaginationButton
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          active={currentPage === startPage + index}
        >
          {startPage + index}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={handleNext}
        disabled={currentGroup >= totalGroups - 1}
      >
        <img
          src={
            currentGroup >= totalGroups - 1 ? DisabledNextButton : NextButton
          }
          alt="오른쪽 화살표 아이콘"
          width={10}
          height={10}
        />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
