import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import Button from '../components/Button';
import profileImageDefault from '../assets/images/ico/profile.png';
import apiClient from '../config/AxiosConfig'; // axios 클라이언트 추가

const Header = ({ onLoginClick, onSignupClick }) => {
  const location = useLocation(); // 현재 경로 확인
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(profileImageDefault); // 기본 프로필 이미지
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 처음 로드될 때 로그인 상태를 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [location]); // 페이지가 이동될 때마다 로그인 상태 확인

  const checkLoginStatus = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await apiClient.get('/members', {
          headers: {
            Authorization: token, // JWT 토큰을 헤더에 추가
          },
        });
        const memberData = response.data;

        // 사용자 이름 및 프로필 이미지 업데이트
        setUsername(memberData.name);
        const profileImageUrl = memberData.fileName
          ? `${process.env.REACT_APP_PROFILE_IMAGE_BASE_URL}${memberData.fileName}`
          : profileImageDefault;

        setProfileImage(profileImageUrl); // 프로필 이미지 설정
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching member data:', error);
        setIsLoggedIn(false);
      }
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
              <Link to="/plan/survey">여행 플랜 만들기</Link>
            </li>
            <li>
              <Link to="/board/list">플랜 공유하기</Link>
            </li>
            <li>
              <Link to="/personalityTest/test">여행 유형 테스트</Link>
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
                  src={profileImage} // 서버에서 불러온 프로필 이미지
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
