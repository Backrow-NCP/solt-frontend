import styled from 'styled-components';

export const PlanContainer = styled.div`
  display: flex;
  justify-content: center; /* 제목을 중앙에 배치 */

  position: relative; /* 버튼을 우하단에 배치하기 위해 relative 설정 */
`;

export const ButtonContainer = styled.div`
  position: absolute; /* 버튼을 절대 위치로 설정 */
  bottom: -30px; /* 아래쪽으로 위치 조정 */
  right: 0; /* 오른쪽으로 위치 조정 */
  margin: 20px; /* 버튼과 가장자리 간의 여백 조정 */
`;
