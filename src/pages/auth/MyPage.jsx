import React, { useEffect, useState } from 'react';
import MyPageStyles from '../../styles/auth/myPage';
import PlanContainer from '../../components/Board/PlanContainer';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '../../assets/images/ico/profile.png';
import Button from '../../components/Button';

const MyPage = () => {
  const [name, setName] = useState('');
  const [plans, setPlans] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // 상태로 네비게이션 바 가시성 관리
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    fetch('/mock/member.json')
      .then(response => response.json())
      .then(data => {
        const member = data.members.find(member => member.id === 1);
        setName(member.name);
      });

    fetch('/mock/plan.json')
      .then(response => response.json())
      .then(data => {
        setPlans(data.slice(0, 2));
      });

    // 네비게이션 바가 부드럽게 나타나도록 상태 업데이트
    setIsSidebarVisible(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('로그아웃 처리');
    navigate('/');
  };

  const handleEdit = planId => {
    console.log(`Plan ${planId} 수정`);
  };

  const handleDelete = planId => {
    console.log(`Plan ${planId} 삭제`);
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  return (
    <>
      <MyPageStyles />
      <div className="mypage">
        {/* 네비게이션 바에 isSidebarVisible 상태에 따라 show 클래스를 추가 */}
        <nav className={`sidebar ${isSidebarVisible ? 'show' : ''}`}>
          <h2 className="size_xl weight_b pt_blue">마이페이지</h2>
          <ul>
            <li>
              <Link to="/auth/myplan" className="size_sm">
                나의 플랜
              </Link>
            </li>
            <li>
              <Link to="/auth/myboard" className="size_sm">
                나의 게시글
              </Link>
            </li>
          </ul>
        </nav>
        <div className="main-container">
          <div className="profile-container">
            <div className="profile-image-container">
              <img
                src={profileImage}
                alt="프로필 이미지"
                className="profile-image"
              />
              <Link to="/auth/profileEdit" className="size_xs profile-edit">
                프로필 관리 ⚙️
              </Link>
            </div>
            <div className="profile-info">
              <h1>{name} 님만의 공간 :)</h1>
            </div>
            <div className="logout-section">
              <button className="logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          </div>
          <div className="my-plan-container">
            <h1 style={{ marginBottom: '15px' }}>나의 플랜</h1> {/* h1과 PlanContainer 사이 간격 추가 */}
            {plans.map(plan => (
              <div key={plan.id} style={{ marginBottom: '15px' }}> {/* PlanContainer 사이 간격 */}
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
      </div>
    </>
  );
};

export default MyPage;
