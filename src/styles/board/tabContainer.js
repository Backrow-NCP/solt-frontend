import styled from 'styled-components';

export const CombinedContainer = styled.div`
  margin-top: 15px;
  background-color: #f9f9f9; // 전체 배경 색상
  border-radius: 5px; // 전체 컨테이너의 둥글게 처리
  overflow: hidden; // 경계선 없애기
`;

export const TabsContainer = styled.div`
  display: flex;
  margin: 0; // 마진 제거하여 연결된 느낌을 줌
`;

export const Tab = styled.div`
  flex: 1;
  padding: 15px;
  cursor: pointer;
  text-align: center;
  background-color: ${props =>
    props.$isActive ? '#f9f9f9' : '#ffffff'}; // 선택된 탭 흰색
  transition: background-color 0.3s;
  font-size: 18px;

  &:hover {
    background-color: #e0e0e0; // 호버 시 진한 색상
  }
`;

export const ContentContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CombinedDetailContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MarginBox = styled.div`
  padding: 20px; // 내부 여백 추가
  background-color: #f9f9f9; // 전체 배경 색상
  border-radius: 5px; // 전체 컨테이너의 둥글게 처리
  overflow: hidden; // 경계선 없애기
`;
