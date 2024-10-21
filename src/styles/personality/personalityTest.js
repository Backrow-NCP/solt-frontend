import styled from 'styled-components';

const PersonalityTestStyle = styled.div`
  flex-wrap: nowrap !important;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  text-align: center;

  .test_inner {
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center; /* 텍스트 수평 가운데 정렬 */
  }

  .result_box {
    width: 100%; /* 기본적으로 가로 크기를 100%로 설정 */
    max-width: 1000px; /* 최대 가로 크기 1000px로 제한 */
    margin: 0 auto;
    padding: 40px;
    border-radius: 24px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: rgba(20, 184, 255, 0.04);

    /* 블러 처리 */
    // backdrop-filter: blur(50px);
    // -webkit-backdrop-filter: blur(50px); /* 사파리 호환성 */
  }

  @media (max-width: 768px) {
    /* 화면 너비가 768px 이하일 때 */
    .result_box {
      padding: 20px; /* 좁은 화면에서는 패딩을 줄여서 공간을 절약 */
    }
  }

  @media (max-width: 480px) {
    /* 더 작은 화면에서는 */
    .result_box {
      padding: 10px; /* 매우 작은 화면에서는 패딩을 더 줄임 */
    }
  }

  .test_main img {
    border-radius: 32px;
    user-drag: none;
    -webkit-user-drag: none;
    width: 70%;
    height: auto;
  }

  .progress-container {
    background-color: #e0e0e0;
    border-radius: 8px;
    height: 10px;
    width: 50%;
    margin-bottom: 20px;
    margin: 0 auto;
  }

  .progress-bar {
    background-color: #14b8ff;
    height: 100%;
    border-radius: 8px;
    transition: width 0.3s ease-in-out; /* 부드러운 애니메이션 */
  }

  // 결과 시즈닝 이미지
  .test_result {
    width: 100%; /* 부모 요소의 너비를 100%로 설정 */
    display: flex;
    justify-content: center; /* 부모 요소 내에서 이미지를 중앙 정렬 */
  }

  .test_result img {
    border-radius: 32px;
    user-drag: none;
    -webkit-user-drag: none;
    width: 50%;
    height: auto;
    min-width: 500px; /* 이미지의 최소 너비를 설정 */
    max-width: 1000px; /* 이미지의 최대 너비를 설정 (필요에 따라 설정) */
  }

  .spot {
    width: 100%; /* 기본적으로 부모 컨테이너의 너비에 맞춤 */
    max-width: 300px; /* 최대 크기를 300px로 제한 */
    height: auto; /* 가로 비율에 맞추어 높이 설정 */
    aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
    border-radius: 32px; /* 테두리 둥글게 */
    overflow: hidden; /* 원 밖의 이미지는 숨김 */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spot img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 컨테이너에 맞게 잘림 */
    object-position: center; /* 이미지의 중앙을 맞춤 */
  }

  .test_match {
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 필요시 수직 가운데 정렬 */
  }

  .test_match img {
    border-radius: 32px;
    display: block; /* 이미지를 블록 요소로 설정 */
    object-fit: cover; /* 이미지가 컨테이너에 맞게 잘림 */
    object-position: center; /* 이미지의 중앙을 맞춤 */
    width: 300px; /* 원하는 크기로 설정 */
    height: 300px;
  }

  .test_flex {
    display: flex;
    flex-wrap: wrap; /* 필요 시 줄바꿈 */
    gap: 20px; /* 각 섹션 간 여백 */
    justify-content: space-around; /* 양쪽 정렬 */
  }

  @media (max-width: 768px) {
    /* 화면 너비가 768px 이하일 때 */
    .test_flex {
      flex-direction: column; /* 세로로 나열 */
      align-items: center; /* 세로로 배치 시 중앙 정렬 */
    }
  }
  /* 각 섹션 너비 설정 */
  .test_flex > div {
    flex: 1;
    max-width: 100%;
  }

  .title {
    margin: 80px 0 32px;
  }

  .result_title {
    position: relative; /* 기본적으로는 상대적 위치 */
    margin: 80px 0 32px;
    transition: all 0.3s ease-in-out;
  }

  // .result_title.sticky {
  //   position: sticky;
  //   top: 100px; /* 도달했을때 고정시킬 위치 */
  //   z-index: -10; /* 스크롤에 따라 우선순위가 달라지도록 */
  // }

  .bar {
    margin: 80px 0 32px;
  }

  .bar p {
    margin-left: auto; /* p 요소를 우측으로 정렬 */
    margin-top: 12px;
    text-align: center;
    margin-bottom: 5px;
  }

  .answerBtn {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center; /* 중앙 정렬 */
    width: 100%; /* 부모 요소 너비를 100%로 설정 */
  }

  .answerBtn button {
    width: 100%; /* 버튼의 너비를 60%로 설정, 필요에 따라 조정 가능 */
    max-width: 600px; /* 버튼의 최대 너비 설정 */
  }

  .result_content {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .result_btn {
    display: flex;
    justify-content: center; /* 버튼들을 가운데 정렬 */
    gap: 20px; /* 버튼 사이의 간격을 20px로 설정 */
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .question {
    margin-top: 100px;
    margin-bottom: 50px;
  }

  .question-image-container {
    position: relative; /* 부모 요소를 기준으로 자식들을 배치 */
    width: 800px; /* 이미지와 동일한 크기로 설정 */
  }

  .question-image {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%); /* 이미지 중앙 정렬 */
    width: 400px; /* 원하는 이미지 크기 */
    height: auto;
    opacity: 0.1; /* 이미지 투명도 */
    z-index: -1; /* 배경으로 설정 */
  }

  .overlay-text {
    position: relative; /* relative로 텍스트를 이미지 위에 배치 */
    top: -100px; /* 이미지와 겹치는 위치로 조정 */
    color: black; /* 텍스트 색상 (배경과 대비되는 색으로 설정) */
    font-size: 24px; /* 적절한 글씨 크기 설정 */
    text-align: center; /* 텍스트 중앙 정렬 */
    z-index: 1; /* 텍스트가 이미지 위에 표시되도록 z-index 설정 */
    margin-top: -100px; /* 텍스트 위치 추가 조정 */
  }

  .question-image img {
    border-radius: 32px;
    display: block; /* 이미지 주변 여백 제거 */
    width: 100%;
    height: auto;
  }

  .test_size_xxs {
    font-size: 18px;
  }
  .test_size_xs {
    font-size: 20px;
  }
  .test_size_sm {
    font-size: 22px;
  }
  .test_size_md {
    font-size: 24px;
  }
  .test_size_lg {
    font-size: 26px;
  }
  .test_size_xl {
    font-size: 28px;
  }
`;

export default PersonalityTestStyle;
