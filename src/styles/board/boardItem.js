import styled from 'styled-components';

export const BoardBox = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row; /* 가로 배치 */
  align-items: flex-start; /* 수직 정렬 */
  margin-bottom: 20px; /* 게시글 간 간격 */
`;

export const Thumbnail = styled.img`
  width: 120px; /* 이미지 크기 */
  height: 120px; /* 이미지 크기 */
  object-fit: cover; /* 이미지 비율 유지 */
  border-radius: 10px; /* 이미지 테두리 둥글게 */
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column; /* 텍스트 세로 배치 */
  flex-grow: 1; /* 남은 공간 차지 */
  margin-left: 10px;

  .info {
    display: flex; /* 정보를 가로로 배치 */
    justify-content: space-between; /* 양쪽 정렬 */
    width: 100%; /* 전체 너비 사용 */
    font-size: 12px; /* 폰트 크기 */
    margin-left: 7px;
  }

  .locationDurationContainer {
    display: flex; /* 가로 배치 */
    margin-top: 10px; /* 상단 여백 추가 */
    margin-right: 15px;
  }

  .locationBox,
  .durationBox {
    border: 1px solid #ccc; /* 테두리 추가 */
    border-radius: 10px; /* 테두리 둥글게 */
    padding: 5px; /* 내부 여백 추가 */
    margin-right: 7px; /* 각 박스 간 간격 */
    margin-bottom: 7px;
  }

  .locationBox span,
  .durationBox span {
    font-weight: bold; /* Bold 효과 */
  }

  .locationBox {
    /* 필요시 locationBox 스타일 추가 */
  }

  .durationBox {
    /* 필요시 durationBox 스타일 추가 */
  }

  .contentBox {
    width: 100%; /* 콘텐츠 박스의 고정 너비 설정 */
    max-width: 95%; /* 필요시 최소 너비 설정 */
    max-height: 4.8em; /* 3줄의 높이로 제한 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 "..."으로 표시 */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 최대 3줄로 제한 */
    -webkit-box-orient: vertical;
    word-wrap: break-word; /* 긴 단어를 자동으로 줄바꿈 */
    line-height: 1.6em; /* 줄 높이를 맞춤 */
    white-space: normal; /* 여러 줄을 허용 */
    margin-left: 10px;
  }

  .dateAuthorContainer {
    display: flex;
    flex-direction: column; /* 위아래로 정렬 */
    align-items: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 10px; /* 아래쪽 여백 추가 */
    margin-top: 5px;
    color: #999;
  }
`;
