import { createGlobalStyle } from 'styled-components';

const SignupStyles = createGlobalStyle`
  .signup-popup-overlay {
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

  .signup-popup {
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

  .signup-form {
    display: flex;
    flex-direction: column;
  }

  .input-group {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center; /* input-group을 수평 가운데 정렬 */
  }

  .input-group input {
    width: 100%;  /* 이메일, 이름, 비밀번호 입력란 */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
  }

  .input-small {
    width: 70%;  /* 이메일, 이름 입력란 */
  }

  .input-group button {
    margin-left: 10px;
  }

  /* 드롭다운 (년도, 월, 일) 스타일 */
  .date-dropdown {
    display: flex;
    justify-content: space-between;
    width: 100%;  /* 드롭다운 전체 너비를 이메일/비밀번호 입력란과 동일하게 */
  }

  .date-dropdown select {
    width: 32%;  /* 각 드롭다운 너비를 균등하게 설정하여 전체 너비가 100%에 맞도록 */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    appearance: none;
    background-color: white;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iIzY2NiIgZD0iTTEgMTVhMSAxIDAgMCAwIDEuNDE0Ny0uNTg1NEwxMiAxN2wxMC41ODUyLTguNTg1NEExIDEgMCAwIDEgMjUgOGgtMjRjLS41NTIgMC0xIC40NDgtMSAxek01LjA4NDcgMjMuOTg1NEw2LjQxNDcgMjVjLjI1MS4yMzkuNTkyLjQwNS45ODUuNDA1SDIzaC4zNTNjLjM5NiAwIC43MzQuMTY2Ljk4NC40MDVMMjQuOTkxOCAyNWExIDEgMCAwIDAgMC0xLjQwNTRMMTUgMTNsLTEwLjU4NTUgOC41ODUzQTEgMSAwIDAgMCA1LjA4NDcgMjMuOTg1NHoiLz48L3N2Zz4=');
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) center;
    background-size: 12px;
    padding-right: 30px;
    color: #666;
    text-align: right;  /* 글씨를 우측 정렬 */
  }

  .date-dropdown select option:first-child {
    color: #888;  
  }

  /* 성별 선택 라디오 버튼 스타일 */
  .gender-group {
    display: flex;  /* 성별 라디오 버튼을 가로로 배치 */
    gap: 40px;  /* 남자, 여자 사이 간격 */
    align-items: center;
  }

  .gender-group > div {
    display: flex;
    align-items: center;  /* 라디오 버튼과 레이블을 나란히 정렬 */
  }

  .gender-group label {
    margin-left: 5px;  /* 라디오 버튼과 레이블 간의 간격 */
    font-size: 16px;
  }
`;

export default SignupStyles;
