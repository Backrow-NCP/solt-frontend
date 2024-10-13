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
    opacity: 0;
    animation: fadeIn 0.5s forwards; /* 팝업 배경 페이드인 */
  }

  .login-popup {
    background-color: #fff;
    padding: 30px;
    border-radius: 32px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    opacity: 0;
    transform: translateY(-30px); /* 위에서 아래로 슬라이드하는 효과 */
    animation: slideDown 0.5s forwards; /* 팝업 슬라이드 다운 애니메이션 */
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px); /* 초기 위치: 위 */
    }
    to {
      opacity: 1;
      transform: translateY(0); /* 최종 위치: 제자리 */
    }
  }

  /* 닫기 버튼 */
  .close-button {
    position: absolute;
    top: 15px;
    margin-right: 10px;  
    right: 10px;
    background: none;
    border: none;
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
    font-size: 14px;
    margin-bottom: 20px;
    gap: 15px; /* 버튼 사이의 간격을 15px로 설정 */

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
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #333;
    }
  }
`;

export default LoginStyles;
