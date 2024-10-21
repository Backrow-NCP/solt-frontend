import { createGlobalStyle } from 'styled-components';

const MyPageStyles = createGlobalStyle`
  .mypage {
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 20px;
    max-width: 1600px;
    max-height: 1200px;
    margin: 80px auto 0;
  }

  .main_container {
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
  .profile_container {
    display: flex;
    align-items: center;
    gap: 50px;
    width: 100%;
    max-width: 100%;
    margin-top: 60px;
    margin-left: 50px;
  }

  .profile_image_container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile_image {
    width: 100%;
    max-width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: #fff;
    object-fit: cover;
  }

  .profile_edit {
    margin-top: 10px;
    color: #000000;
    text-decoration: none;
  }

  .profile_info {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .profile_info h1 {
    font-size: 24px;
    font-weight: 600;
  }

  .my_plan_container {
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

    .profile_container {
      width: 100%;
      max-width: 800px;
      margin-left: 0;
      margin-right: 0;
      margin: 0 auto;
    }

    .profile_image {
      width: 180px;
    }

    .my_plan_container {
      margin: 0;
      padding: 10px;
    }

    .my_plan_container h1 {
      font-size: 18px;
    }

    .plan_card {
      margin-bottom: 15px;
    }

    .plan_title {
      font-size: 16px;
    }
  }

  @media (max-width: 780px) {
    .profile_container {
      flex-direction: column;
      gap: 30px;
    }

    .logout_section {
      margin-top: 10px;
      align-self: center;
    }

    .profile_image {
      width: 170px;
      height: 150px;
    }

    .logout_btn {
      width: 100%;
      max-width: 200px;
    }
  }
`;

export default MyPageStyles;
