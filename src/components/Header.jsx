import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import Button from '../components/Button';
import profileImage from '../assets/images/ico/profile.png';

const Header = ({ onLoginClick, onSignupClick }) => {
  const location = useLocation(); // 현재 경로 확인
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, [location]);  // 페이지가 이동될 때마다 로그인 상태 확인
  
  const checkLoginStatus = async () => {
    const token = localStorage.getItem('AccessToken');
    const storedUsername = localStorage.getItem('username');
  
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);  // 사용자 이름 설정
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  };


  return (
    <header>
      <div className="inner flex">
        <h1 className="logo">
          <a href="/">
            <img src={logo} alt="SOLT" />
          </a>
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
            <div
              className="profile_section"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Link to="/auth/mypage">
                <img
                  src={profileImage} // 기본 프로필 이미지로 설정
                  alt="프로필"
                  className="profile_image"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    marginRight: '10px',
                  }}
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
