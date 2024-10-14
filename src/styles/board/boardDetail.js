// src/styles/boardDetail.js
import styled from 'styled-components';

export const BoardDetailContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

export const Content = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #666;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: #999;
`;

export const DateAuthorContainer = styled.p`
  font-size: 12px;
  color: #999;
  text-align: right; // 우측 정렬
  margin-top: 10px;
`;

export const Image = styled.img`
  max-width: 415px; /* 너비를 고정 */
  height: 275px;
  border-radius: 5px;

  object-fit: contain; /* 이미지를 비율에 맞춰 고정 영역을 채우도록 설정 */
  display: block; /* 블록 요소로 설정하여 중앙 정렬 */
  margin-left: auto; /* 좌우 마진을 자동으로 설정하여 중앙 정렬 */
  margin-right: auto; /* 좌우 마진을 자동으로 설정하여 중앙 정렬 */
`;

export const InfoTextTitleContainer = styled.div`
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  margin: 0; /* 여백 없애기 */
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center; /* 버튼과 이미지를 중앙 정렬 */
  justify-content: space-between; /* 버튼을 양쪽에 배치 */
  margin: 10px 0; /* 위아래 여백 추가 */
`;

export const Button = styled.button`
  cursor: pointer; /* 커서를 포인터로 변경 */
  padding: 5px; /* 버튼 내부 여백 */
  display: flex; /* 내부 요소 정렬을 위해 flex 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 30px; /* 고정된 너비 설정 */
  height: 30px; /* 고정된 높이 설정 */

  &:hover {
    opacity: 0.8; /* 호버 시 불투명도 조정 */
  }

  /* 이미지 크기 조정 */
  img {
    max-width: 100%; /* 이미지 최대 너비 100% */
    max-height: 100%; /* 이미지 최대 높이 100% */
  }
`;
export const ThumbnailContainer = styled.div`
  display: flex; /* 썸네일을 가로로 배치 */
  justify-content: center; /* 중앙 정렬 */
  margin-bottom: 20px;
`;

export const Thumbnail = styled.img`
  width: 40px; /* 썸네일의 너비 설정 */
  height: 40px; /* 썸네일의 높이 설정 */
  border-radius: 5px; /* 모서리 둥글게 */
  margin: 0 5px; /* 좌우 여백 */
  cursor: pointer; /* 커서를 포인터로 변경 */

  &:hover {
    opacity: 0.8; /* 호버 시 불투명도 조정 */
  }

  /* 선택된 썸네일 강조 스타일 */
  &.active {
    border: 2px solid #007bff; /* 선택된 썸네일에 강조 테두리 */
  }
`;
