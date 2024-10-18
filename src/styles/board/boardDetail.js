// src/styles/boardDetail.js
import styled from 'styled-components';
import { scrollbar } from '../../styles/scrollbar';
export const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

export const Content = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #222;
  padding: 0 30px;
`;

export const InfoText = styled.p`
  font-size: 12px;
  color: #999;
  font-weight: bold;
`;

export const DateAuthorContainer = styled.p`
  font-size: 12px;
  color: #999;
  text-align: right; // 우측 정렬
  margin: 3px 10px 5px;
`;

export const InfoTextTitleContainer = styled.div`
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  margin-top: 30px; /* 여백 없애기 */
`;

export const Image = styled.img`
  max-width: 400px; /* 너비를 고정 */
  height: 275px;
  object-fit: contain; /* 이미지를 비율에 맞춰 고정 영역을 채우도록 설정 */
  display: block; /* 블록 요소로 설정하여 중앙 정렬 */
  margin-left: auto; /* 좌우 마진을 자동으로 설정하여 중앙 정렬 */
  margin-right: auto; /* 좌우 마진을 자동으로 설정하여 중앙 정렬 */
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center; /* 버튼과 이미지를 중앙 정렬 */
  justify-content: space-between; /* 버튼을 양쪽에 배치 */
  margin: 0px 0; /* 위아래 여백 추가 */
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
  margin-top: 5px;
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

export const ButtonContainerStyled = styled.div`
  display: flex;
  justify-content: flex-end; // 우측 정렬
  margin-top: 3px; // 버튼과 콘텐츠 간의 간격
  margin-right: 10px;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: gray; // 회색 텍스트
  font-size: 12px; // 작은 글자 크기
  cursor: pointer;

  &:hover {
    text-decoration: underline; // 마우스 오버 시 밑줄 추가
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: gray; // 회색 텍스트
  font-size: 12px; // 작은 글자 크기
  cursor: pointer;
  margin-left: 5px; // 버튼 간의 간격

  &:hover {
    text-decoration: underline; // 마우스 오버 시 밑줄 추가
    color: red;
  }
`;

export const BoardContainer = styled.div`
  height: 48vh;
  overflow-y: auto;
  ${scrollbar}

  display: flex;
  flex-direction: column;
`;
