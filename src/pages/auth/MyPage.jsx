import React, { useEffect, useState } from 'react';
import MyPageStyles from '../../styles/auth/MyPage'; // 스타일 파일을 import
import Button from '../../components/Button'; // Button 컴포넌트 import
import { Link } from 'react-router-dom'; // Link 컴포넌트를 사용
import profileImage from '../../assets/images/profile.png'; // 프로필 이미지를 불러오는 경로를 맞춰주세요
import seoulImage from '../../assets/images//bn/area1.jpg';
import jejuImage from '../../assets/images/bn/area2.jpg';
import busanImage from '../../assets/images/bn/area3.jpg';
import gyeongjuImage from '../../assets/images/bn/area4.jpg';
import gangneungImage from '../../assets/images/bn/area5.jpg';


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

  // area 값에 따라 해당 지역에 맞는 이미지를 반환하는 함수
  const getImageForArea = (area) => {
    switch (area) {
      case '서울':
        return seoulImage; 
      case '제주도':
        return jejuImage; 
      case '부산':
        return busanImage; 
      case '경주':
        return gyeongjuImage;
      case '강릉':
        return gangneungImage;
      // 추가적으로 필요한 지역 이미지를 추가할 수 있습니다.
      default:
        return '/images/default.jpg'; // 기본 이미지 (없을 경우)
    }
  };

  

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

      <div className="my-plan-container">
          <h1>나의 플랜</h1>
          {plans.map((plan) => (
            <div className="plan-card" key={plan.id}
            style={{
              backgroundImage: `url(${getImageForArea(plan.area)})`, // 지역에 따른 배경 이미지 설정
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              {/* 왼쪽 영역 (Date, Area) */}
              <div className="plan-details">
                <p className="plan-date">{`${plan.startDate} ~ ${plan.endDate}`}</p>
                <p className="plan-area">{plan.area}</p>
              </div>
              {/* 가운데 영역 (Name + 수정 버튼) */}
              <div className="plan-name">
                <h2 className="plan-title">{plan.title}</h2>
                <button className="edit-btn">✎</button> 
              </div>
              {/* 오른쪽 영역 (Buttons) */}
              <div className="plan-actions">
                <Button color="blue" size="sm">수정</Button>
                <Button color="white" size="sm">삭제</Button>
              </div>
            </div>
          ))}
        </div>
    </>
  );
};

export default MyPage;
