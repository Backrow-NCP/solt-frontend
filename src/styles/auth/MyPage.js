import { createGlobalStyle } from 'styled-components';

const MyPageStyles = createGlobalStyle`
  /* 상위 컨테이너 */
.main-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 80%;
  gap: 20px;
  margin: 80px auto 0; /* 위에 여백을 주고, 좌우는 auto로 중앙에 배치 */
  max-width: 1600px;
}


  /* 좌측 네비게이션 바 */
  .sidebar {
    width: 200px;
    background-color: #fff;
    //padding: 20px;
    position: relative;
    margin-top: 60px;
    //top: 130px;
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
    //justify-content: center;
    gap: 50px;
    width: 100%;
    max-width: 1000px;
    margin-top: 60px; /* profile-section 전체를 아래로 이동 */
    //margin-left: 200px;
  }

  /* 프로필 이미지 및 관리 버튼을 세로로 정렬 */
  .profile-image-container {
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: center;

  }

  .profile-image {
  width: 100%;
  max-width: 200px;
  height: auto;
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

  .example-section2 {
    max-width: 1600px;
    width: 200px;
  }

  


  /* 하단 플랜 컨테이너 */
  .my-plan-container {
    margin-top: 40px;
    max-width: 1200px;
    width: 100%;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
   // background-color: #f9f9f9;
    border-radius: 10px;
    //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .my-plan-container h1 {
    margin-bottom: 20px;
  }

 /* Plan Card */
  .plan-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150px;
    background-color: #f9f9f9;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  /* 왼쪽 영역 (Date와 Area) */
  .plan-details {
    display: flex;
    flex-direction: column;
    width: 33.3%;
    text-align: center;
  }

  .plan-date {
    color: #888;
  }

  /* 가운데 영역 (Name + 수정 버튼) */
  .plan-name {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.3%;
  }

  .plan-title {
    font-size: 18px;
    margin-right: 8px; /* 버튼과 이름 사이의 간격 */
  }

  .edit-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #333;
  }

  /* 오른쪽 영역 (Buttons) */
  .plan-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 33.3%;
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
    max-width: 150px;
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

`;

export default MyPageStyles;
