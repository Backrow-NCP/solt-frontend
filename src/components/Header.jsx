import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import mypage from '../assets/images/ico/mypage.svg'

const Header = ({ isLoggedIn }) => {
  return (
    <header>
      <div className="inner flex">
        <h1 clssName="logo">
					<a href="/"><img src={logo} alt="SOLT" /></a>
				</h1>

        <nav>
            <ul className="flex">
							<li>
									<a href="/plan/survey">여행 계획 만들기</a>
							</li>
							<li>
									<a href="/board/list">플랜 공유하기</a>
							</li>
						</ul>
				</nav>

        <div className="log">
            {isLoggedIn ? (
            <Link to="/auth/mypage" className="logout"><img src={mypage} alt="mypage" /></Link>
            ) : (
            <div className="login">
                <Link to="/auth/signup" className="btn_blk">회원가입</Link>
                <Link to="/auth/login" className="btn_wht">로그인</Link>
            </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
