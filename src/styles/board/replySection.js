// src/styles/replySection.js
import styled from 'styled-components';

// 댓글 섹션 스타일링

export const ReplyContainer = styled.div`
  margin-top: 20px;
  text-align: left;
`;

export const ReplyCount = styled.p`
  font-weight: bold;
  margin-bottom: 3px;
`;

export const ReplyInput = styled.input`
  width: 80%;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 0px;
`;

export const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: blue; // 원하시는 색상으로 변경
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkblue; // 호버 효과
  }
`;

export const ReplyListContainer = styled.div`
  margin: 10px auto; /* 자동으로 좌우 여백 조정 */
  width: 90%; /* 넓이를 80%로 유지 */
  border: 1px solid #ccc; /* 구분선 */
  padding: 15px 30px;
  background-color: white;
`;

// 댓글 아이템 컨테이너
export const ReplyItem = styled.div`
  display: flex; /* 플렉스 박스를 사용하여 프로필과 댓글을 나란히 배치 */
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0; /* 마지막 아이템의 margin-bottom 제거 */
  }
`;

// 프로필 이미지 스타일
export const ProfileImage = styled.img`
  width: 40px; /* 프로필 이미지 크기 */
  height: 40px;
  border-radius: 50%; /* 원형으로 만들기 */
  margin-right: 10px; /* 댓글과의 간격 */
  border: none; /* 기본 border 제거 */
  box-shadow: 0 0 0 0.5px #9999; /* 테두리 효과를 주기 위한 box-shadow */
  margin-top: -5px;
`;

// 댓글 내용 컨테이너
export const ReplyContent = styled.div`
  flex: 1; /* 댓글 내용이 나머지 공간을 차지하도록 설정 */
`;

export const ReplyMeta = styled.div`
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 좌우 공간을 자동으로 분배 */
  align-items: flex-start; /* 위쪽 정렬 */
  margin-bottom: 3px; /* 하단 여백 추가 (필요 시 조정) */
`;

export const ReplyDate = styled.div`
  font-size: 0.65em; /* 폰트 사이즈 조정 */
  color: #666; /* 색상 조정 (원하는 색상으로 변경 가능) */
  text-align: right; /* 우측 정렬 */
  margin-top: 2px; /* 댓글 내용과의 간격 */
`;

export const ReplyName = styled.div`
  font-size: 0.9em; /* 폰트 사이즈 조정 (원하는 사이즈로 변경 가능) */
  color: #999; /* 연한 색상으로 변경 (원하는 색상으로 수정 가능) */
  margin-right: 10px; /* 날짜와의 간격 조정 (필요 시 수정) */
`;

export const SubReplyButton = styled.button`
  background-color: transparent; /* 배경 투명하게 */
  color: gray; /* 글씨 색상을 회색으로 설정 */

  cursor: pointer;
  font-size: 12px; /* 글씨 크기 작게 */
  text-decoration: underline; /* 밑줄 추가 */
  margin-bottom: 5px;

  &:hover {
    color: darkgray; /* 호버 시 색상 변경 */
  }
`;

export const ReplySubmitContainer = styled.div`
  /* 기본 스타일 추가 가능 */

  &.main-reply-submit {
    margin-left: 30px; /* 댓글 입력란에만 적용 */
  }
`;
