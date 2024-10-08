import styled, { createGlobalStyle } from 'styled-components';

// 전역 스타일 추가
export const GlobalStyle = createGlobalStyle`
  .slick-prev:before, .slick-next:before {
    color: black; /* 화살표 색상 설정 */
    opacity: 0.4; /* 화살표 투명도 설정 */
    font-size: 30px; /* 화살표 크기 설정 */
  }
  .slick-list {margin: 0 -20px;}
  .slick-slide>div {padding: 0 20px;}
`;

export const CarouselContainer = styled.div`
  width: 100%; /* 전체 화면의 90% 정도의 너비만 차지하도록 수정 */
  max-width: 1400px; /* 최대 너비를 설정하여 너무 커지지 않도록 제한 */

  margin: 0 auto;
  padding: 20px 0;
  position: relative; /* 필요 시, 내부 요소의 포지셔닝을 위한 상대 위치 */
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 300px; /* 이미지 높이 조정 */
  object-fit: cover; /* 이미지 비율 유지 */
  border-radius: 10px;
`;

export const OverlayBlack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* 부모 요소에 맞춤 */
  height: 100%; /* 부모 요소에 맞춤 */
  background-color: rgba(0, 0, 0, 0.5); /* 검은색 배경에 투명도 적용 */
  border-radius: 10px; /* 이미지와 일치하도록 둥근 모서리 적용 */
`;

export const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 0; /* 왼쪽에서 시작하도록 설정 */
  transform: translate(0, -20%); /* 수직 중앙 정렬 */
  color: white; /* 텍스트 색상 */
  font-size: 24px; /* 텍스트 크기 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* 텍스트 그림자 */

  .author {
    opacity: 0.8; /* 작성자 이름의 투명도 설정 */
    font-size: 12px;
    margin-left: 15px;
  }

  .locationDurationContainer {
    display: flex; /* 가로 배치 */
    font-size: 12px;
    gap: 3px; /* 박스 간 간격 조정 */
    margin-left: 13px;
    margin-bottom: 5px;
  }

  .locationBox,
  .durationBox {
    border: 1px solid #ccc; /* 테두리 추가 */
    border-radius: 10px; /* 테두리 둥글게 */
    padding: 5px; /* 내부 여백 추가 */
    font-weight: bold;
  }

  .contentBox {
    width: 100%; /* 콘텐츠 박스의 고정 너비 설정 */
    max-width: 95%; /* 필요시 최소 너비 설정 */
    max-height: 4.8em;
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 "..."으로 표시 */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 최대 3줄로 제한 */
    -webkit-box-orient: vertical;
    word-wrap: break-word; /* 긴 단어를 자동으로 줄바꿈 */
    line-height: 1.2em; /* 줄 높이를 맞춤 */
    white-space: normal; /* 여러 줄을 허용 */
    font-size: 15px;
    height: calc(1.2em * 3); /* 1줄의 높이(1.2em) * 3줄 = 3.6em */
    margin-left: 15px;
    margin-bottom: 0px; /* 하단 여백 조정 */

    overflow-wrap: break-word; /* 긴 단어에만 줄바꿈 적용 */
    word-break: normal; /* 기본 줄바꿈 동작으로 변경 */
  }

  .bestTitle {
    margin-left: 15px;
  }

  .bestLikeCount {
    margin-left: 15px;
    font-size: 15px;
    margin-bottom: 0px; /* 하단 여백 줄이기 */
    margin-top: 10px;
  }

  .heart {
    color: red; /* ♥ 심볼의 색상 */
    font-size: 15px; /* 심볼의 크기 */
    transform: scaleX(1.3); /* 가로로 1.5배 확장 */
    display: inline-block; /* transform을 적용하기 위해 inline-block 설정 */
    margin-right: 2px;
  }
`;

// 화살표 버튼 스타일 추가
export const NextArrow = styled.div`
  display: block;
  width: 30px; /* 너비 설정 */
  height: 30px; /* 높이 설정 */
  border-radius: 50%; /* 둥글게 만들기 */
  position: absolute;
  top: 50%;
  right: -45px; /* 오른쪽 위치 조정 (밖으로 이동) */
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  z-index: 10; /* z-index로 다른 요소 위에 표시 */
  cursor: pointer; /* 커서 포인터 설정 */
`;

export const PrevArrow = styled.div`
  display: block;
  width: 30px; /* 너비 설정 */
  height: 30px; /* 높이 설정 */
  border-radius: 50%; /* 둥글게 만들기 */
  position: absolute;
  top: 50%;
  left: -45px; /* 왼쪽 위치 조정 (밖으로 이동) */
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  z-index: 10; /* z-index로 다른 요소 위에 표시 */
  cursor: pointer; /* 커서 포인터 설정 */
`;
