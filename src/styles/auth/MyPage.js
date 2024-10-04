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

/* Plan Card */
.plan-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
  background-size: cover;
  background-position: center;
  margin-top: 10px;
}

.plan-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0); /* 초기 상태에서 투명하게 설정 */
  z-index: 0;
  border-radius: 20px;
  transition: background 0.3s ease; /* 배경색이 부드럽게 변경되도록 트랜지션 설정 */
}

.plan-card:hover::before {
  background: rgba(0, 0, 0, 0.4); /* 마우스를 올렸을 때 어두운 반투명 배경 표시 */
}

.plan-details, .plan-name, .plan-actions, .edit-btn {
  z-index: 1; /* z-index를 1로 낮춤 */
  weight: 500px;
}


/* 왼쪽 영역 (Date와 Area) */
.plan-details {
  display: flex;
  flex-direction: column;
  width: 33.3%;
  text-align: center;
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
  //color: #333;
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
