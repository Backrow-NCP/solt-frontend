import React, { useEffect, useState } from 'react';
import MyPlanStyles from '../../styles/auth/MyPlan'; // 스타일 파일을 import
import Button from '../../components/Button'; // Button 컴포넌트 import
import { Link } from 'react-router-dom'; // Link 컴포넌트를 사용
import seoulImage from '../../assets/images//bn/area1.jpg';
import jejuImage from '../../assets/images/bn/area2.jpg';
import busanImage from '../../assets/images/bn/area3.jpg';
import gyeongjuImage from '../../assets/images/bn/area4.jpg';
import gangneungImage from '../../assets/images/bn/area5.jpg';


const MyPlan = () => {
  const [plans, setPlans] = useState([]); // useState 훅 사용

  useEffect(() => {
    fetch('/mock/plan.json') // public 폴더 내의 mock 폴더에 접근
      .then((response) => response.json())
      .then((data) => setPlans(data));
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
    

  return (
    <>
      <MyPlanStyles />
      <div className="main-container">
        <nav className="sidebar"> 
          <Link to="/auth/mypage">
            <h2 className="size_lg weight_sb">마이페이지</h2>
          </Link>
          <ul>
            <li>
              <Link to="/auth/myplan" className="size_sm weight_b pt_blue">
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

      </div>
    </>
  );
};

export default MyPlan;
