import React, { useEffect, useState } from 'react';
import MyPlanStyles from '../../styles/auth/MyPlan';
import PlanContainer from '../../components/PlanContainer'; // PlanContainer import
import Button from '../../components/Button'; // Button 컴포넌트 불러오기
import { Link } from 'react-router-dom';
import itaewonImage from '../../assets/images/bn/area1.jpg';
import jamsilImage from '../../assets/images/bn/area2.jpg';
import gangnamImage from '../../assets/images/bn/area3.jpg';
import jongroImage from '../../assets/images/bn/area4.jpg';
import hongdaeImage from '../../assets/images/bn/area5.jpg';

const MyPlan = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch('/mock/plan.json')
      .then(response => response.json())
      .then(data => setPlans(data));
  }, []);

  const getImageForArea = area => {
    switch (area) {
      case '이태원':
        return itaewonImage;
      case '잠실':
        return jamsilImage;
      case '강남':
        return gangnamImage;
      case '종로':
        return jongroImage;
      case '홍대':
        return hongdaeImage;
      default:
        return '/images/default.jpg';
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
          {plans.map(plan => (
            <div key={plan.id} style={{ marginBottom: '10px' }}>
              {/* Margin 추가 */}
              <PlanContainer plan={plan} getImageForArea={getImageForArea}>
                {/* 여기에서 버튼 추가 */}
                <Button color="blue" size="sm">
                  수정
                </Button>
                <Button color="white" size="sm">
                  삭제
                </Button>
              </PlanContainer>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPlan;
