import React, { useEffect, useState } from 'react';
import MyPageStyles from '../../styles/auth/myPage';
import Sidebar from '../../components/Sidebar';
import PlanContainer from '../../components/Board/PlanContainer';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '../../assets/images/ico/profile.png';
import Button from '../../components/Button';

const MyPage = () => {
  const [username, setUsername] = useState(''); // 사용자 이름만 관리
  const [plans, setPlans] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인한 사용자의 이름을 localStorage에서 가져옴
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername); // 사용자 이름 설정
    } else {
      // 로그인 정보가 없을 경우 처리 (로그인 페이지로 이동)
      navigate('/login');
    }

    // 플랜 데이터 불러오기 (임시 데이터 혹은 API 호출)
    fetch('/mock/plan.json')
      .then(response => response.json())
      .then(data => {
        setPlans(data.slice(0, 2)); // 플랜 리스트 설정
      });

    // 네비게이션 바가 부드럽게 나타나도록 상태 업데이트
    setIsSidebarVisible(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 삭제
    localStorage.removeItem('username'); // 사용자 이름 삭제
    setIsLoggedIn(false);
    console.log('로그아웃 처리');
    navigate('/'); // 홈으로 이동
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
        <div className="main_container">
          <div className="profile_container">
            <div className="profile_image_container">
              <img
                src={profileImage}
                alt="프로필 이미지"
                className="profile_image"
              />
              <Link to="/auth/profileEdit" className="size_xs profile_edit">
                프로필 관리 ⚙️
              </Link>
            </div>
            <div className="profile_info">
              <h1>{username} 님만의 공간 :)</h1>
            </div>
            <div className="logout_section">
              <button className="logout_btn" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          </div>
          <div className="my_plan_container">
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
