import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GlobalStyles from './styles/global.js';
import Write from './pages/board/Write';
import Edit from './pages/board/Edit';
import List from './pages/board/List';
//아래는 로그인 서비스와 병합
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import FindPassword from './pages/auth/FindPassword';
import PasswordReset from './pages/auth/PasswordReset';
import MyPlan from './pages/auth/MyPlan';
import MyPage from './pages/auth/MyPage';
import ProfileEdit from './pages/auth/ProfileEdit.jsx';
import MyBoard from './pages/auth/MyBoard.jsx';

function App() {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
  const [isFindPasswordPopupOpen, setFindPasswordPopupOpen] = useState(false);

  const openLoginPopup = () => setLoginPopupOpen(true);
  const closeLoginPopup = () => setLoginPopupOpen(false);
  const openSignupPopup = () => setSignupPopupOpen(true);
  const closeSignupPopup = () => setSignupPopupOpen(false);
  const openFindPasswordPopup = () => setFindPasswordPopupOpen(true);
  const closeFindPasswordPopup = () => setFindPasswordPopupOpen(false);
  return (
    <>
      <GlobalStyles />

      <Router>
        <div
          className={`App ${
            isLoginPopupOpen || isSignupPopupOpen || isFindPasswordPopupOpen
              ? 'blur-background'
              : ''
          }`}
        >
          <Header
            onLoginClick={openLoginPopup}
            onSignupClick={openSignupPopup}
          />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/board/write" element={<Write />} />
              <Route path="/board/edit" element={<Edit />} />
              <Route path="/board/list" element={<List />} />
              
              <Route path="/auth/signup" element={<Signup />}/>{/* 회원가입 페이지 */}
              <Route path="/auth/findpassword" element={<FindPassword />}/>{/* 비밀번호 찾기 페이지 */}              
              <Route path="/auth/passwordreset" element={<PasswordReset />}/>{/* 비밀번호 재설정 페이지 */}
              <Route path="/auth/mypage" element={<MyPage />}/>{/* 마이 페이지 */}              
              <Route path="/auth/myplan" element={<MyPlan />}/>{/* 마이 플랜 페이지 */}
              <Route path="/auth/myboard" element={<MyBoard />}/> {/*마이 보드 페이지*/}
              <Route path="/auth/profileEdit" element={<ProfileEdit />}/>{/* 프로필 수정 페이지 */}       
            </Routes>
          </main>

          <Footer />
          {/* 로그인 팝업 조건부 렌더링 */}
          {isLoginPopupOpen && (
            <Login
              closePopup={closeLoginPopup}
              onSignupClick={openSignupPopup}
              onFindPasswordClick={openFindPasswordPopup}
            />
          )}

          {/* 회원가입 팝업 조건부 렌더링 */}
          {isSignupPopupOpen && <Signup closePopup={closeSignupPopup} />}

          {/* 비밀번호 찾기 팝업 조건부 렌더링 */}
          {isFindPasswordPopupOpen && (
            <FindPassword closePopup={closeFindPasswordPopup} />
          )}
        </div>
      </Router>
    </>
  );
}

export default App;

