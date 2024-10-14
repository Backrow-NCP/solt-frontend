import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import Button from '../components/Button';
import profileImage from '../assets/images/profile.png';
import profileImage2 from '../assets/images/아이유.jpg'; // MyPage2에서 사용할 이미지

const Header = ({ onLoginClick, onSignupClick }) => {
  const location = useLocation(); // 현재 경로 확인
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }); // location 변경 시 실행

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      // MyPage2로 리다이렉트 되었을 때 "지은"으로 고정
      if (location.pathname === '/auth/mypage2') {
        setUsername('지은');
      } else {
        fetch('/mock/member.json')
          .then(response => response.json())
          .then(data => {
            const member = data.members.find(member => member.id === 1);
            if (member) {
              setUsername(member.name);
            }
          });
      }
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  };

  // MyPage2로 이동할 경우 profileImage2 사용, 그 외는 profileImage 사용
  const currentProfileImage =
    location.pathname === '/auth/mypage2' ? profileImage2 : profileImage;

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
              className="profile-section"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Link to="/auth/mypage">
                <img
                  src={currentProfileImage} // 경로에 따른 이미지 변경
                  alt="프로필"
                  className="profile-image"
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
