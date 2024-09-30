import React, { useEffect, useState } from 'react';
import MyPageStyles from '../../styles/auth/MyPage'; // 스타일 파일을 import
import { Link } from 'react-router-dom'; // Link 컴포넌트를 사용
import profileImage from '../../assets/images/profile.png'; // 프로필 이미지를 불러오는 경로를 맞춰주세요

const MyPage = () => {
  const [name, setName] = useState(''); // 이름 상태 관리
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // member.json 파일에서 데이터를 가져오는 fetch 함수
    fetch('/mock/member.json')
      .then((response) => response.json())
      .then((data) => {
        const member = data.members.find((member) => member.id === 1); // 임의로 id 1인 회원을 선택
        setName(member.name); // 상태에 이름 저장
      });

    // plan.json 파일에서 상위 2개의 플랜만 가져오기
    fetch('/mock/plan.json')
      .then((response) => response.json())
      .then((data) => {
        setPlans(data.slice(0, 2)); // 상단 2개의 플랜만 가져오기
      });
  
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 로그아웃 로직을 여기서 처리하면 됩니다.
    console.log('로그아웃 처리');
  };

  return (
    <>
      <MyPageStyles />
      <div className="main-container">
        {/* 좌측 네비게이션 바 */}
        <nav className="sidebar">
          <h2 className="size_lg weight_b pt_blue">마이페이지</h2>
          <ul>
            <li>
              <Link to="/auth/myplan" className="size_sm">
                나의 플랜
              </Link>
            </li>
            <li>
              <Link to="/auth/myboard" className="size_sm">
                내가 쓴 게시글
              </Link>
            </li>
          </ul>
        </nav>

        {/* 우측 상단 프로필 영역 */}
        <div className="profile-section">
          <div className="profile-image-container">
            <img src={profileImage} alt="프로필 이미지" className="profile-image" />
            <Link to="/auth/profileEdit" className="size_xs profile-edit">프로필 관리 ⚙️</Link>
          </div>
          <div className="profile-info">
            <h1>{name} 님만의 공간 :)</h1> {/* 이름만 표시 */}
          </div>
                    {/* 로그아웃 버튼 추가 */}
                    <div className="logout-section">
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          </div>
          
        </div>

        {/*임시*/}
        <div className="example-section2">
        </div>
        
      </div>

      {/* 나의 플랜 상단 2개만 표시 */}
      <div className="my-plan-container">
        <h1 className="size_xl weight_md">나의 플랜</h1>
        {plans.map((plan) => (
          <div className="plan-card" key={plan.id}>
            <div className="plan-details">
              <p className="plan-date">{`${plan.startDate} ~ ${plan.endDate}`}</p>
              <p className="plan-area">{plan.area}</p>
            </div>
            <div className="plan-name">
              <h2 className="plan-title">{plan.title}</h2>
              <button className="edit-btn">✎</button>
            </div>
            <div className="plan-actions">
              <button className="btn_pink">수정</button>
              <button className="btn_wht">삭제</button>
            </div>
           </div>
         ))}
      </div>
      
    </>
  );
};

export default MyPage;
