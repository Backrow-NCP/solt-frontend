import { createGlobalStyle } from 'styled-components';

const FindPasswordStyles = createGlobalStyle`
  .find-password-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .find-password-popup {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }

  .find-password-form {
    display: flex;
    flex-direction: column;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .input-group input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

    .find-password-button {
    margin-left: 15px;
    padding: 10px 20px;
    background-color: #fff; /* 버튼 배경색을 흰색으로 변경 */
    color: #000; /* 텍스트 색상을 검은색으로 변경 */
    border: 1px solid #888; /* 테두리 색상을 #888로 설정 */
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1; /* 호버 시 살짝 밝은 색으로 변경 */
    }
    }


  .find-password-submit-button {
    width: 40%;
    padding: 10px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin: 15px auto 0 auto; /* 수평 중앙 정렬 */

    &:hover {
      background-color: #333;
    }
  }
`;

export default FindPasswordStyles;
