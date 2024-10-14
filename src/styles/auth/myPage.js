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

/* 좌측 네비게이션 바 */
.sidebar {
  width: 200px;
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
  opacity: 1; /* 보이게 설정 */
  visibility: visible; /* 가시성 설정 */
  transform: translateX(0); /* 원래 위치로 슬라이드 */
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
