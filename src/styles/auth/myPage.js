import { createGlobalStyle } from 'styled-components';

const MyPageStyles = createGlobalStyle`
.mypage {
  display: flex;
  flex-direction: row;
  margin: 80px auto 0; /* 위에 여백을 주고, 좌우는 auto로 중앙에 배치 */
  max-width: 1600px;
}


.main-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 80%;
  gap: 20px;
  margin: 20px;
}


/* 좌측 네비게이션 바 */
.sidebar {
  width: 200px;
  background-color: #fff;
  position: relative;
  margin-top: 60px;
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

.profile-container {
  display: flex;
  align-items: center;
  gap: 50px;
  width: 100%;
  max-width: 100%;
  margin-top: 60px;
  margin-left: 50px; /* 요소들을 오른쪽으로 이동 */
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
  background-color: #fff;
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
  max-width: 1200px;
  width: 100%;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}



/* 반응형 설정 */
@media (max-width: 1024px) {
  .mypage {
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
    margin-top: 40px;
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
