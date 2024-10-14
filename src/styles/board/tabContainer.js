import styled from 'styled-components';

export const CombinedContainer = styled.div`
  background-color: #f9f9f9; // 전체 배경 색상
  border-radius: 8px; // 전체 컨테이너의 둥글게 처리
  overflow: hidden; // 경계선 없애기
`;

export const TabsContainer = styled.div`
  display: flex;
  margin: 0; // 마진 제거하여 연결된 느낌을 줌
`;

export const Tab = styled.div`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  background-color: ${props =>
    props.$isActive ? '#f9f9f9' : '#ffffff'}; // 선택된 탭 흰색
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0; // 호버 시 진한 색상
  }
`;

export const ContentContainer = styled.div`
  padding: 0px;
  background-color: #ffffff; // 콘텐츠 컨테이너 색상
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;
