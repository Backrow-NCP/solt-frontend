import { createGlobalStyle } from 'styled-components';

const MyPlanStyles = createGlobalStyle`
  /* 상위 컨테이너 - 네비게이션 바와 my-plan-container를 묶는 컨테이너 */
  .main-container {
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 20px;
    max-width: 1600px;
    margin: 80px auto 0; /* 위에 여백을 주고, 좌우는 auto로 중앙에 배치 */
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

  /* Plan Container */
  .my-plan-container {
    flex-grow: 1;
    margin: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .my-plan-container h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
  }

  /* Plan Card */
  .plan-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    height: 150px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative; /* ::before를 사용하려면 position 설정 필요 */
    overflow: hidden; /* ::before 요소가 카드 경계를 벗어나지 않도록 설정 */
  }

  .plan-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0); /* 기본 상태에서는 투명 */
    transition: background 0.3s ease; /* 부드러운 전환 효과 */
    z-index: 0;
    border-radius: 10px;
  }

  .plan-card:hover::before {
    background: rgba(0, 0, 0, 0.4); /* 마우스 오버 시 어두운 반투명 배경 적용 */
  }

  .plan-details, .plan-name, .plan-actions {
    z-index: 1; /* 내용이 ::before 위에 표시되도록 설정 */
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

export default MyPlanStyles;
