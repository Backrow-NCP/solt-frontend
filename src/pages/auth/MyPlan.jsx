import React, { useEffect, useState } from 'react';
import MyPlanStyles from '../../styles/auth/myPlan';
import PlanContainer from '../../components/Board/PlanContainer'; // PlanContainer import
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Sidebar from '../../components/Sidebar';

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
    // 플랜 삭제 로직
    const confirmed = window.confirm(`정말로 플랜을 삭제하시겠습니까?`);
    if (confirmed) {
      setPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
      console.log(`Plan ${id} 삭제 완료`);
    }
  };

  return (
    <>
      <MyPlanStyles />
      <div className="myplan">
        <Sidebar className="sidebar" />

        <div className="my-plan-container">
          <h1>나의 플랜</h1>
          {plans.length > 0 ? (
            plans.map(plan => (
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
            ))
          ) : (
            <p>플랜이 없습니다. 새로운 플랜을 추가해주세요!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPlan;
