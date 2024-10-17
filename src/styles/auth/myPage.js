import { createGlobalStyle } from 'styled-components';

const MyPageStyles = createGlobalStyle`
  .mypage {
    display: flex;
    flex-direction: row;
    margin: 80px auto 0;
    max-width: 1600px;
    max-height: 800px;
  }

  .main-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 80%;
    gap: 20px;
    margin: 20px;
  }

  /* Sidebar 관련 슬라이드 애니메이션 */
  .sidebar {
    width: 15%; /* 퍼센트로 설정 */
    max-width: 200px;
    background-color: #fff;
    position: relative;
    margin-top: 60px;
    bottom: 0;
    z-index: 1;
    opacity: 0; /* 초기값: 투명 */
    visibility: hidden; /* 초기값: 숨김 */
    transform: translateX(-20px); /* 슬라이드 효과 추가 */
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out, transform 0.7s ease-in-out; /* 트랜지션 */
  }

  .sidebar.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(0); /* 원래 위치로 슬라이드 */
  }

  /* 프로필 및 메인 컨텐츠 */
  .profile-container {
    display: flex;
    align-items: center;
    gap: 50px;
    width: 100%;
    max-width: 100%;
    margin-top: 60px;
    margin-left: 50px;
  }

  .profile-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-image {
    width: 100%;
    max-width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: #fff;
    object-fit: cover;
  }

  .profile-edit {
    margin-top: 10px;
    color: #000000;
    text-decoration: none;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .profile-info h1 {
    font-size: 24px;
    font-weight: 600;
  }

  .my-plan-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1200px;
    width: 100%;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
  }

  /* 반응형 설정 */
  @media (max-width: 1650px) {
    .main-container {
      width: 75%;
      margin: 0 auto;
    }
  }

  @media (max-width: 1215px) {
    .main-container {
      width: 70%;
      margin: 0 auto;
    }
  }

  @media (max-width: 1024px) {
    .mypage {
      flex-direction: column;
    }

    .profile-container {
      width: 100%;
      max-width: 800px;
      margin-left: 0;
      margin-right: 0;
      margin: 0 auto;
    }

    .profile-image {
      width: 180px;
    }

    .my-plan-container {
      margin: 0;
      padding: 10px;
    }

    .my-plan-container h1 {
      font-size: 18px;
    }

    .plan-card {
      margin-bottom: 15px;
    }

    .plan-title {
      font-size: 16px;
    }
  }

  @media (max-width: 780px) {
    .profile-container {
      flex-direction: column;
      gap: 30px;
    }

    .logout-section {
      margin-top: 10px;
      align-self: center;
    }

    .profile-image {
      width: 170px;
      height: 150px;
    }

    .logout-btn {
      width: 100%;
      max-width: 200px;
    }
  }
`;

export default MyPageStyles;
