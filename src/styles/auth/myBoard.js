import { createGlobalStyle } from 'styled-components';

const MyBoardStyles = createGlobalStyle`
  .myboard {
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 20px;
    max-width: 1600px;
    max-height: 1200px;
    margin: 80px auto 0;
  }  

  .board_items_wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 두 개의 그리드로 고정 */
    gap: 20px; /* 각 박스 사이의 간격 */
    padding: 20px;
    width: 100%; /* 너비를 100%로 설정 */
    align-items: stretch; /* 모든 그리드 아이템의 높이를 동일하게 맞춤 */
  }

  .board_item {
    flex: 0 1 calc(50% - 10px); /* 각 BoardItem의 너비를 50%로 설정 (간격 포함) */
    box-sizing: border-box;
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

  .my_board_container {
    flex-grow: 1;
    margin: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .my_board_container h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
  }

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    .myboard {
      flex-direction: column; /* 화면이 좁아졌을 때, 컨텐츠를 수직 배치 */
    }

    .sidebar {
      width: 100%;
      margin-bottom: 20px; /* 사이드바 아래 여백 추가 */
      position: relative;
      margin-top: 0;
    }

    .my_board_container {
      margin: 0;
      padding: 10px;
    }

    .my_board_container h1 {
      font-size: 18px;
    }
  }

  @media (max-width: 600px) {
    .board_items_wrapper {
      grid-template-columns: 1fr; /* 작은 화면에서는 한 개의 열로 배치 */
    }
  }
`;

export default MyBoardStyles;
