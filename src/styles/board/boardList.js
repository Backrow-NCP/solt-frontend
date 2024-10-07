import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(500px, 1fr)
  ); /* 반응형 그리드 */
  gap: 20px; /* 각 박스 사이의 간격 */
  padding: 20px;
  width: 100%; /* 너비를 100%로 설정 */
  align-items: stretch; /* 모든 그리드 아이템의 높이를 동일하게 맞춤 */
`;
