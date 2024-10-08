// src/components/MyPage.jsx
import React, { useEffect, useState } from 'react';
import MyPageStyles from '../../styles/auth/MyPage';
import PlanContainer from '../../components/PlanContainer';
import { Link } from 'react-router-dom';
import profileImage from '../../assets/images/profile.png';

const MyPage = () => {
  const [name, setName] = useState('');
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch('/mock/member.json')
      .then((response) => response.json())
      .then((data) => {
        const member = data.members.find((member) => member.id === 1);
        setName(member.name);
      });

    fetch('/mock/plan.json')
      .then((response) => response.json())
      .then((data) => {
        setPlans(data.slice(0, 2));
      });
  }, []);

  const handleLogout = () => {
    console.log('로그아웃 처리');
  };

  return (
    <>
      <MyPageStyles />
      <div className="mypage">
        <nav className="sidebar">
          <h2 className="size_lg weight_b pt_blue">마이페이지</h2>
          <ul>
            <li>
              <Link to="/auth/myplan" className="size_sm">나의 플랜</Link>
            </li>
            <li>
              <Link to="/auth/myboard" className="size_sm">내가 쓴 게시글</Link>
            </li>
          </ul>
        </nav>
        <div className="main-container">
          <div className="profile-container">
            <div className="profile-image-container">
              <img src={profileImage} alt="프로필 이미지" className="profile-image" />
              <Link to="/auth/profileEdit" className="size_xs profile-edit">프로필 관리 ⚙️</Link>
            </div>
            <div className="profile-info">
              <h1>{name} 님만의 공간 :)</h1>
            </div>
            <div className="logout-section">
              <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
            </div>
          </div>
          <div className="my-plan-container">
            <h1>나의 플랜</h1>
            {plans.map((plan) => (
              <PlanContainer key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
