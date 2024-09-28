import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); /* 반응형 그리드 */
  gap: 20px; /* 각 박스 사이의 간격 */
  padding: 20px;
  width: 100%; /* 너비를 100%로 설정 */
`;

export const BoardBox = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */

  h3 {
    font-size: 24px;
    margin: 0;
  }

  p {
    font-size: 16px;
  }
`;
