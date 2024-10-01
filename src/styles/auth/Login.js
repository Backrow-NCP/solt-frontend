import { createGlobalStyle } from 'styled-components';

const LoginStyles = createGlobalStyle`
  .login-popup-overlay {
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

  .login-popup {
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

  .login-form {
    display: flex;
    flex-direction: column;
  }

  .input-group {
    margin-bottom: 15px;
  }

  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 400;
  }

  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
  }

  .login-options {
    display: flex;
    justify-content: center;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .login-options a {
    margin: 0 5px; /* 각 링크 사이에 5px의 여백 추가 */
  }

  .login-button {
    width: 100%;
    padding: 10px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #333;
    }
  }
`;

export default LoginStyles;
