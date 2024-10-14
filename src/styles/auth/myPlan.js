// src/styles/auth/MyPlanStyles.js

import { createGlobalStyle } from 'styled-components';

const MyPlanStyles = createGlobalStyle`
  .main-container {
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

export default MyPlanStyles;
