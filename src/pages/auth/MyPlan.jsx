import React, { useEffect, useState } from 'react';
import MyPlanStyles from '../../styles/auth/myPlan';
import PlanContainer from '../../components/Board/PlanContainer'; // PlanContainer import
import { Link } from 'react-router-dom';
import itaewonImage from '../../assets/images/bn/area1.jpg';
import jamsilImage from '../../assets/images/bn/area2.jpg';
import gangnamImage from '../../assets/images/bn/area3.jpg';
import jongroImage from '../../assets/images/bn/area4.jpg';
import hongdaeImage from '../../assets/images/bn/area5.jpg';
import Button from '../../components/Button';

const MyPlan = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch('/mock/plan.json')
      .then(response => response.json())
      .then(data => setPlans(data));
  }, []);

  const handleEdit = id => {
    console.log(`Plan ${id} 수정`);
    // 수정 로직 추가
  };

  const handleDelete = id => {
    console.log(`Plan ${id} 삭제`);
    // 삭제 로직 추가
  };

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
            <div key={plan.id} style={{ marginBottom: '15px' }}> {/* PlanContainer 사이에 간격 추가 */}
              <PlanContainer plan={plan}>
                <Button
                  color="blue"
                  size="sm"
                  onClick={() => handleEdit(plan.id)}
                >
                  수정
                </Button>
                <Button
                  color="white"
                  size="sm"
                  onClick={() => handleDelete(plan.id)}
                >
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
