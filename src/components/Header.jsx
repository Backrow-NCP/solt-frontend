import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import logo from '../assets/images/logo.svg';
import mypage from '../assets/images/ico/mypage.svg'

const Header = ({ isLoggedIn }) => {
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
            <Link to="/auth/mypage" className="logout"><img src={mypage} alt="mypage" /></Link>
            ) : (
            <div className="login">
							<Link to="/auth/signup">
								<Button size="sm" color="black">회원가입</Button>
							</Link>
							<Link to="/auth/login">
								<Button size="sm" color="white">로그인</Button>
							</Link>
            </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
