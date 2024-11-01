import { createGlobalStyle } from 'styled-components';

const PasswordResetStyles = createGlobalStyle`
  .password_reset_popup_overlay {
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

  .password_reset_popup {
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

  .close_button {
    position: absolute;
    top: 15px;
    margin-right: 10px;
    right: 10px;
    background: none;
    border: none;
    font-weight: 400;
    cursor: pointer;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }

  .password_reset_form {
    display: flex;
    flex-direction: column;
  }

  .input_group {
    margin-bottom: 15px;
  }

  .input_group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
  }

  .password_reset_submit_button {
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

export default PasswordResetStyles;
