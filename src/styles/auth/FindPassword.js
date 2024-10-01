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
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .input-group input {
    flex: 1;
    width: 70%; /* 이메일 입력란의 너비를 줄임 */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
  }

  .input-group button {
    margin-left: 10px; /* 이메일 입력란과 버튼 사이의 간격을 늘림 */
  }

  
`;

export default FindPasswordStyles;
