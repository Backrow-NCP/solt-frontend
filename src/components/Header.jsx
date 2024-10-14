import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import Button from '../components/Button';
import profileImage from '../assets/images/profile.png';
import mypage from '../assets/images/ico/mypage.svg'

const Header = ({ onLoginClick, onSignupClick }) => {
  const location = useLocation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('/mock/member.json')
      .then((response) => response.json())
      .then((data) => {
        const member = data.members.find((member) => member.id === 1);
        if (member) {
          setUsername(member.name);
        }
      });
  }, []);

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
          {['/auth/mypage', '/auth/myplan', '/auth/myboard'].includes(location.pathname) ? (
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
