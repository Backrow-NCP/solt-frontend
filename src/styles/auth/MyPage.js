import { createGlobalStyle } from 'styled-components';

const MyPageStyles = createGlobalStyle`
  /* 상위 컨테이너 */
  .main-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    gap: 20px;
  }

  /* 좌측 네비게이션 바 */
  .sidebar {
    width: 200px;
    background-color: #fff;
    padding: 20px;
    position: relative;
    top: 130px;
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

  /* 프로필 섹션 */
  .profile-section {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1000px;
    margin-top: 60px; /* profile-section 전체를 아래로 이동 */
  }

  /* 프로필 이미지 및 관리 버튼을 세로로 정렬 */
  .profile-image-container {
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: center;
  }

  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #888;
  }

  .profile-edit {
    margin-top: 10px; /* 이미지와 간격 */
    color: #000000;
    text-decoration: none;
  }

  /* 프로필 정보 */
  .profile-info {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .profile-info h1 {
    font-size: 24px;
    font-weight: 600;
  }

  /* 하단 플랜 컨테이너 */
  .my-plan-container {
    margin-top: 40px;
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

    .profile-section {
      width: 100%;
      justify-content: center;
      text-align: center;
      margin-top: 40px; /* 반응형에서도 아래로 이동 */
    }

    .profile-image {
      margin-bottom: 20px;
    }

    .my-plan-container {
      width: 100%;
      margin: 0;
    }
  }
`;

export default MyPageStyles;
