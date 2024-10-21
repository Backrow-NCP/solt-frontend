import React, { useEffect, useState } from 'react';
import MyPageStyles from '../../styles/auth/myPage';
import Sidebar from '../../components/Sidebar';
import PlanContainer from '../../components/Board/PlanContainer';
import { Link, useNavigate } from 'react-router-dom';
import profileImageDefault from '../../assets/images/ico/profile.png'; // 기본 프로필 이미지
import Button from '../../components/Button';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig'; // axios 클라이언트 설정

const MyPage = () => {
  const [username, setUsername] = useState(''); // 사용자 이름 상태 관리
  const [profileImage, setProfileImage] = useState(profileImageDefault); // 기본 프로필 이미지로 초기화
  const [plans, setPlans] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(setLoading);
  }, []);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 로컬스토리지에서 JWT 토큰을 가져옴
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login'); // 토큰이 없으면 로그인 페이지로 이동
          return;
        }

        // 서버에 GET 요청으로 사용자 정보 가져오기
        const response = await apiClient.get('/members', {
          headers: {
            Authorization: token // JWT 토큰을 헤더에 추가
          }
        });

        const memberData = response.data;

        // 사용자 이름 및 프로필 이미지 업데이트
        setUsername(memberData.name);

        // 서버에서 받은 fileName을 통해 프로필 이미지 URL 설정
        const profileImageUrl = memberData.fileName
          ? `${process.env.REACT_APP_PROFILE_IMAGE_BASE_URL}${memberData.fileName}`
          : profileImageDefault;

        setProfileImage(profileImageUrl); // 프로필 이미지 설정

      } catch (error) {
        console.error('Error fetching member data:', error);
        navigate('/'); // 오류 발생 시 로그인 페이지로 이동
      }
    };

    fetchMemberData(); // 사용자 정보 가져오기 함수 호출

    // 플랜 데이터 불러오기 (임시 데이터 혹은 API 호출)
    fetch('/mock/plan.json')
      .then((response) => response.json())
      .then((data) => {
        setPlans(data.slice(0, 2)); // 플랜 리스트 설정
      });

    // 네비게이션 바가 부드럽게 나타나도록 상태 업데이트
    setIsSidebarVisible(true);
  }, [navigate, setPlans, setIsSidebarVisible]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 삭제
    localStorage.removeItem('username'); // 사용자 이름 삭제
    localStorage.removeItem('profileImage'); // 프로필 이미지 삭제
    setIsLoggedIn(false);
    console.log('로그아웃 처리');
    navigate('/'); // 홈으로 이동
  };

  return (
    <>
      <MyPageStyles />
      <div className="mypage">
        <Sidebar />
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
            {plans.map((plan) => (
              <div key={plan.id} style={{ marginBottom: '15px' }}> {/* PlanContainer 사이 간격 */}
                <PlanContainer plan={plan}>
                  <Button
                    color="blue"
                    size="sm"
                    onClick={() => console.log(`Plan ${plan.id} 수정`)}
                  >
                    수정
                  </Button>
                  <Button
                    color="white"
                    size="sm"
                    onClick={() => console.log(`Plan ${plan.id} 삭제`)}
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
