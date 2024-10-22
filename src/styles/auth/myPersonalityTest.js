import { createGlobalStyle } from 'styled-components';

const MyPersonalityTestStyles = createGlobalStyle`

  .result_inner {
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center; /* 텍스트 수평 가운데 정렬 */
  }
  .result-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
  }

    .my-test-container {
    flex-grow: 1;
    margin: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

    .my-test-container h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
  }

  .result-item {
    background-color: rgba(20, 184, 255, 0.04);
    border-radius: 32px;
    padding: 15px;
    text-align: center;
    transition: transform 0.2s ease-in-out;
  }

  .result-item:hover {
    transform: scale(1.05);
  }

  .result-item h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  .result-item p {
    font-size: 0.9em;
    color: #555;
  }

  .result-item img {
    width: 100%;
    height: auto;
    border-radius: 32px;
    margin-top: 10px;
  }

  /* 반응형 웹 설정 */
  @media (max-width: 1200px) {
    .result-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 900px) {
    .result-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

   .mytest {
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
    .main-container {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      position: relative;
      top: 0;
      left: 0;
      margin-bottom: 20px;
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
export default MyPersonalityTestStyles;