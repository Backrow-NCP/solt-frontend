import { createGlobalStyle } from 'styled-components';

const MyPlanStyles = createGlobalStyle`
  .myplan {
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 20px;
    max-width: 1600px;
    max-height: 1200px;
    margin: 80px auto 0;
  }

  .sidebar {
    width: 200px;
    background-color: #fff;
    position: relative;
    margin-top: 60px;
    bottom: 0;
    z-index: 1;
  }

  .sidebar h2 {
    margin-bottom: 20px;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    margin-bottom: 20px;
  }

  .sidebar ul li a:hover {
    color: #14B8FF;
  }

  .my-plan-container {
    flex-grow: 1;
    margin: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .my-plan-container h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
  }

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    .myplan {
      flex-direction: column; /* 사이드바와 컨텐츠를 수직으로 배치 */
    }

    .sidebar {
      width: 100%;
      margin-bottom: 20px; /* 사이드바 아래 여백 추가 */
      position: relative;
      margin-top: 0;
    }

    .my-plan-container {
      margin: 0;
      padding: 10px;
    }

    .my-plan-container h1 {
      font-size: 18px;
    }
  }
`;

export default MyPlanStyles;
