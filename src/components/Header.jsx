// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/images/logo.svg';
// import mypage from '../assets/images/ico/mypage.svg'

// const Header = ({ isLoggedIn }) => {
//   return (
//     <header>
//       <div className="inner flex">
//         <h1 className="logo">
// 					<a href="/"><img src={logo} alt="SOLT" /></a>
// 				</h1>

//         <nav>
//             <ul className="flex">
// 							<li>
// 									<Link to="/plan/survey">여행 계획 만들기</Link>
// 							</li>
// 							<li>
// 									<Link to="/board/list">플랜 공유하기</Link>
// 							</li>
// 						</ul>
// 				</nav>

//         <div className="log">
//             {isLoggedIn ? (
//             <Link to="/auth/mypage" className="logout"><img src={mypage} alt="mypage" /></Link>
//             ) : (
//             <div className="login">
//                 <Link to="/auth/signup" className="btn_blk">회원가입</Link>
//                 <Link to="/auth/login" className="btn_wht">로그인</Link>
//             </div>
//             )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import Button from '../components/Button'; // Button 컴포넌트 import
import profileImage from '../assets/images/profile.png'; // 프로필 사진 경로

const Header = () => {
  const location = useLocation();
  const [username, setUsername] = useState(''); // 사용자 이름 상태 관리

  useEffect(() => {
    // member.json 파일에서 데이터를 가져오는 fetch 함수
    fetch('/mock/member.json')
      .then((response) => response.json())
      .then((data) => {
        const member = data.members.find((member) => member.id === 1); // 임의로 id 1인 회원 선택
        if (member) {
          setUsername(member.name); // 사용자 이름 설정
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
          {location.pathname === '/auth/mypage' ? (
            // MyPage에서만 프로필 이미지와 사용자 이름 표시
            <div className="profile-section" style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/auth/mypage">
                <img 
                  src={profileImage} 
                  alt="프로필" 
                  className="profile-image" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} // 이미지 크기와 둥글게 처리
                />
              </Link>
              <span>{username}님</span> {/* 사용자 이름 표시 */}
            </div>
          ) : (
            // 다른 페이지에서는 회원가입과 로그인 버튼 표시
            <div className="login">
              <Button
                size="lg"
                color="black"
                as={Link}
                to="/auth/signup"
                className="btn_blk"
              >
                회원가입
              </Button>
              <Button
                size="lg"
                color="white"
                as={Link}
                to="/auth/login"
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

