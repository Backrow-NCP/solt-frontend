import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup'; 
import FindPassword from './pages/auth/FindPassword';
import GlobalStyles from './styles/global.js';
import PasswordReset from './pages/auth/PasswordReset';
import MyPlan from './pages/auth/MyPlan';
import MyPage from './pages/auth/MyPage';
import ProfileEdit from './pages/auth/ProfileEdit.jsx';

function App() {
  return (
    <>
      <GlobalStyles />

      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="auth/login" element={<Login />} /> {/* 로그인 페이지 */}
              <Route path="auth/signup" element={<Signup />} /> {/* 회원가입 페이지 */}
              <Route path="auth/findpassword" element={<FindPassword />} /> {/* 비밀번호 찾기 페이지 */}
              <Route path="auth/passwordreset" element={<PasswordReset />} />
              <Route path="auth/myplan" element={<MyPlan/>}/>
              <Route path="auth/mypage" element={<MyPage/>}/>
              <Route path="auth/profileEdit" element={<ProfileEdit/>}/>
            </Routes>
          </main>
          {/*<Footer />*/}
        </div>
      </Router>
    </>
  );
}

export default App;
