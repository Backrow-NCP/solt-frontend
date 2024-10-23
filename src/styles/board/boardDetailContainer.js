import styled from 'styled-components';
import Heart from '@react-sandbox/heart'; // Heart 컴포넌트를 직접 사용

export const DetailWrapper = styled.div`
  display: flex; /* flex를 사용하여 하위 요소의 배치 조정 */
  flex-direction: column; /* 요소들을 수직으로 정렬 */
  position: absolute;
  top: 20px;
  left: 20px;
  width: 580px;
  height: 1010px;
  margin-top: 10px;
  background-color: white;
  border-radius: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding-top: 40px; /* 상단 패딩 */
  padding-left: 40px; /* 좌측 패딩 */
  padding-right: 40px; /* 우측 패딩 */
  padding-bottom: 30px; /* 하단 패딩을 줄임 */
  z-index: 2;
`;

export const BottomButtonContainer = styled.div`
  margin-top: auto; /* 상단 요소들이 공간을 차지한 후 아래로 밀어내기 */
  display: flex;
  justify-content: center;
  padding: 0px;
  background-color: #fff;
  margin-bottom: 20px;
  z-index: 3; /* 상단 요소보다 우선 순위를 높임 */
`;

// Heart 스타일링
export const HeartStyled = styled(Heart)`
  cursor: pointer;
  width: 24px; /* 원하는 너비로 설정 */
  height: 24px; /* 원하는 높이로 설정 */
  margin-left: 5px;
`;
