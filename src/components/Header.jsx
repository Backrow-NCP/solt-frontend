import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import Button from '../components/Button';
import profileImage from '../assets/images/profile.png';

const Header = ({ onLoginClick, onSignupClick }) => {
  const location = useLocation();
  const navigate = useNavigate(); // 페이지 리다이렉트를 위한 useNavigate 훅 사용
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지가 로드될 때 로그인 여부 확인
    checkLoginStatus();
  }, []); // 첫 로드 시에만 실행

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // 로그인된 상태
      setIsLoggedIn(true);

      // 회원 정보를 가져와서 이름 설정 (id: 1의 회원 정보를 이용)
      fetch('/mock/member.json')
        .then((response) => response.json())
        .then((data) => {
          const member = data.members.find((member) => member.id === 1);
          if (member) {
            setUsername(member.name);
          }
        });
    } else {
      // 로그아웃 상태
      setIsLoggedIn(false);
      setUsername('');
    }
  };

  // 로그아웃 버튼을 클릭했을 때 실행
  const handleLogout = () => {
    // 로그아웃 시 localStorage에서 토큰 제거
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');

    // 메인 화면으로 이동하여 헤더가 원래대로 돌아가도록 리다이렉트
    navigate('/');
  };

  return (
    <header>
      <div className="inner flex">
        <h1 className="logo">
          <a href="/"><img src={logo} alt="SOLT" /></a>
        </h1>

        <nav>
          <ul className="flex">
            <li>
              <Link to="/plan/survey">여행 계획 만들기</Link>
            </li>
            <li>
              <Link to="/board/list">플랜 공유하기</Link>
            </li>
          </ul>
        </nav>

        <div className="log">
          {isLoggedIn ? (
            <div className="profile-section" style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/auth/mypage">
                <img 
                  src={profileImage} 
                  alt="프로필" 
                  className="profile-image" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
              </Link>
              <span>{username}님</span>

            </div>
          ) : (
            <div className="login flex">
              <Button
                size="sm"
                color="black"
                onClick={onSignupClick}
                className="btn_blk"
              >
                회원가입
              </Button>
              <Button
                size="sm"
                color="white"
                onClick={onLoginClick}
                className="btn_wht"
              >
                로그인
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
