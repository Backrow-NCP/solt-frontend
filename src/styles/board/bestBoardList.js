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
  cursor: pointer;

  /* 호버 시 어두운 배경색 */
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s ease;
  }

  /* 하트와 좋아요 개수를 항상 하단에 고정 */
  .bestLikeCount {
    position: absolute;
    bottom: 15px; /* 하단에서 10px 위에 고정 */
    left: 15px; /* 왼쪽에서 15px */
    font-size: 15px;
    color: white; /* 텍스트 색상 */
    z-index: 10; /* 다른 요소들 위에 표시되도록 설정 */
  }

  .heart {
    color: red;
    font-size: 15px;
    transform: scaleX(1.3);
    display: inline-block;
    margin-right: 5px;
  }
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  .author {
    opacity: 0.8;
    font-size: 12px;
    margin-top: 90px;
    margin-bottom: 5px;
  }

  .locationDurationContainer {
    display: flex;
    font-size: 12px;
    gap: 3px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .locationBox,
  .durationBox {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    font-weight: bold;
  }

  .contentBox {
    max-height: 4.8em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2em;
    font-size: 15px;
    white-space: normal;
  }

  .bestTitle {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
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
