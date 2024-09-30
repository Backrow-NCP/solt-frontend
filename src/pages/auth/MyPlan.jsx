import React, { useEffect, useState } from 'react';
import MyPlanStyles from '../../styles/auth/MyPlan'; // 스타일 파일을 import
import { Link } from 'react-router-dom'; // Link 컴포넌트를 사용

const MyPlan = () => {
  const [plans, setPlans] = useState([]); // useState 훅 사용

  useEffect(() => {
    fetch('/mock/plan.json') // public 폴더 내의 mock 폴더에 접근
      .then((response) => response.json())
      .then((data) => setPlans(data));
  }, []);
    

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
            <div className="plan-card" key={plan.id}>
              {/* 왼쪽 영역 (Date, Area) */}
              <div className="plan-details">
                <p className="plan-date">{`${plan.startDate} ~ ${plan.endDate}`}</p>
                <p className="plan-area">{plan.area}</p>
              </div>
              {/* 가운데 영역 (Name + 수정 버튼) */}
              <div className="plan-name">
                <h2 className="plan-title">{plan.title}</h2>
                <button className="edit-btn">✎</button> {/* 이름 수정 버튼 */}
              </div>
              {/* 오른쪽 영역 (Buttons) */}
              <div className="plan-actions">
                <button className="btn_pink">수정</button>
                <button className="btn_wht">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPlan;
