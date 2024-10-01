import styled, { createGlobalStyle } from 'styled-components';

// 전역 스타일 추가
export const GlobalStyle = createGlobalStyle`
  .slick-prev:before, .slick-next:before {
    color: black; /* 화살표 색상 설정 */
    opacity: 0.4; /* 화살표 투명도 설정 */
    font-size: 30px; /* 화살표 크기 설정 */
  }
    
//       /* the slides */
//   .slick-slide {
//       margin: 0 10px;
//   }

//   /* the parent */
//   .slick-list {
//       margin: 0 100px;
//   }

`;

export const CarouselContainer = styled.div`
  width: 100%; /* 전체 화면의 90% 정도의 너비만 차지하도록 수정 */
  max-width: 1200px; /* 최대 너비를 설정하여 너무 커지지 않도록 제한 */
  margin: 0 auto;
  padding: 20px 0;
  position: relative; /* 필요 시, 내부 요소의 포지셔닝을 위한 상대 위치 */
`;

export const ImageWrapper = styled.div`
  margin: 0 0px; /* 좌우 간격을 10px로 설정 */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  //   overflow: visible;
  overflow: hidden;
  border-radius: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 300px; /* 이미지 높이 조정 */
  object-fit: cover; /* 이미지 비율 유지 */
  border-radius: 10px;
`;

export const Overlay = styled.div`
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
  left: 50%;
  transform: translate(-50%, -50%);
  color: white; /* 텍스트 색상 */
  font-size: 24px; /* 텍스트 크기 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* 텍스트 그림자 */
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
