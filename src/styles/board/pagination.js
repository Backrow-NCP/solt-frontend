import styled from 'styled-components';

export const PageButton = styled.button`
  background: none;
  border: none;
  color: ${props => (props.active ? '#000' : '#999')};
  font-size: 18px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const SpecialButton = styled.button`
  background: none;
  border: none;
  color: #666; /* 무채색 스타일 */
  font-size: 16px;
  margin: 0 15px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: #000;
  }
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const PaginationButton = styled.button`
  background: none;
  border: none;
  color: ${props => (props.active ? '#000' : '#999')};
  font-size: 18px;
  margin: 0 5px;
  cursor: pointer; // 기본 커서

  /* 중앙 정렬을 위한 flexbox 설정 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */

  &:hover {
    color: #000;
  }

  &.active {
    color: #aaa; /* 현재 페이지 색상 */
    font-weight: bold;
  }

  /* 비활성화 상태에 대한 스타일 */
  &:disabled {
    cursor: default; /* 비활성화 시 커서 변경 */
    opacity: 0.5; /* 비활성화 시 투명도 변경 (선택 사항) */
  }
`;
