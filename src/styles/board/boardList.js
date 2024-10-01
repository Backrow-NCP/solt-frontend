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

export const BoardBox = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  min-height: 150px; /* 최소 높이 설정으로 게시글을 위아래로 늘림 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 내용이 박스 안에서 적절히 배치되도록 */

  h3 {
    font-size: 24px;
    margin: 0;
  }

  p {
    font-size: 16px;
    flex-grow: 1; /* 본문 내용이 박스 안에서 공간을 유동적으로 차지하게 함 */
  }
`;
