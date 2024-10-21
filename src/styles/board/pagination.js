import styled from 'styled-components';

// 페이지 버튼 스타일
export const PaginationButton = styled.button`
  background: none;
  border: none;
  color: ${props => (props.active === 'true' ? '#000' : '#999')};
  font-size: 18px;
  margin: 0 5px; /* 기본 간격 */
  cursor: pointer;

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
    opacity: 0.5; /* 비활성화 시 투명도 변경 */
  }

  /* 화면 크기에 따른 동적 간격 */
  @media (max-width: 1200px) {
    margin: 0 4px;
  }

  @media (max-width: 992px) {
    margin: 0 3px;
  }

  @media (max-width: 768px) {
    margin: 0 2px;
    font-size: 16px; /* 작은 화면에서 폰트 크기도 줄어듦 */
  }

  @media (max-width: 576px) {
    margin: 0 1px;
    font-size: 14px; /* 더 작은 화면에서 폰트 크기 줄어듦 */
  }
`;

// PaginationContainer 스타일
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
