// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import GlobalStyles from '../src/styles/global.js';

// // 플랜 서비스
// import Survey from './pages/plan/Survey';
// import Produce from './pages/plan/Produce';
// import Complete from './pages/plan/Complete';
// import SurveyEdit from './pages/plan/modify/SurveyEdit.jsx';

// // 게시물 관리
// import Write from './pages/board/Write';
// import Edit from './pages/board/Edit';
// import List from './pages/board/List';
// import Detail from './pages/board/Detail.jsx';

// // 회원 관리
// import Login from './pages/auth/Login';
// import Signup from './pages/auth/Signup';
// import FindPassword from './pages/auth/FindPassword';
// import PasswordReset from './pages/auth/PasswordReset';
// import MyPage from './pages/auth/MyPage';
// import MyPlan from './pages/auth/MyPlan';
// import MyBoard from './pages/auth/MyBoard.jsx';
// import ProfileEdit from './pages/auth/ProfileEdit.jsx';
// import MyTest from './pages/auth/MyTest.jsx'; // 나의 유형검사

// // 여행 유형 검사
// import PersonalityTest from './pages/personality/Test.jsx';
// import PersonalityResult from './pages/personality/Result.jsx';
// import PersonalityResultList from './pages/personality/ResultList.jsx';

// function App() {
//   const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
//   const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
//   const [isFindPasswordPopupOpen, setFindPasswordPopupOpen] = useState(false);
//   const [isPasswordResetPopupOpen, setPasswordResetPopupOpen] = useState(false);

//   const openLoginPopup = () => setLoginPopupOpen(true);
//   const closeLoginPopup = () => setLoginPopupOpen(false);
//   const openSignupPopup = () => setSignupPopupOpen(true);
//   const closeSignupPopup = () => setSignupPopupOpen(false);

//   const openFindPasswordPopup = () => setFindPasswordPopupOpen(true);
//   const closeFindPasswordPopup = (callback) => {
//     setFindPasswordPopupOpen(false);
//     if (callback) {
//       setTimeout(() => callback(), 300); // FindPassword 팝업이 닫힌 후 PasswordReset 팝업 열기
//     }
//   };

//   const openPasswordResetPopup = () => setPasswordResetPopupOpen(true);
//   const closePasswordResetPopup = () => setPasswordResetPopupOpen(false);

//   return (
//     <>
//       <GlobalStyles />

//       <Router>
//         <div
//           className={`App ${
//             isLoginPopupOpen || isSignupPopupOpen || isFindPasswordPopupOpen || isPasswordResetPopupOpen
//              ? 'blur-background'
//               : ''
//           }`}
//         >
//           <Header
//             onLoginClick={openLoginPopup}
//             onSignupClick={openSignupPopup}
//           />

//           <main>
//             <Routes>
//               <Route path="/" element={<Home />} />

//               {/* 플랜 서비스 */}
//               <Route path="/plan/survey" element={<Survey />} />
//               <Route path="/plan/produce" element={<Produce />} />
//               <Route
//                 path="/plan/complete"
//                 element={<Complete onLoginClick={openLoginPopup} />}
//               />
//               <Route path="/plan/survey/:planId" element={<SurveyEdit />} />

//               {/* 게시물 관리 */}
//               <Route path="/board/write" element={<Write />} />
//               <Route path="/board/edit/:boardId" element={<Edit />} />
//               <Route path="/board/list" element={<List />} />
//               <Route path="/board/detail/:boardId" element={<Detail />} />

//               {/* 회원 관리 */}
//               <Route path="/auth/signup" element={<Signup />} />
//               <Route path="/auth/findpassword" element={<FindPassword />} />
//               <Route path="/auth/passwordreset" element={<PasswordReset />} />
//               <Route path="/auth/mypage" element={<MyPage />} />
//               <Route path="/auth/myplan" element={<MyPlan />} />
//               <Route path="/auth/myboard" element={<MyBoard />} />
//               <Route path="/auth/mytest" element={<MyTest />} />
//               <Route path="/auth/profileEdit" element={<ProfileEdit />} />

//               {/* 유형 테스트 */}
//               <Route
//                 path="/personalityTest/test"
//                 element={<PersonalityTest />}
//               />
//               <Route
//                 path="/personalityTest/result"
//                 element={<PersonalityResult />}
//               />
//               <Route
//                 path="/personalityTest/result/:resultId"
//                 element={<PersonalityResult />}
//               />
//               <Route
//                 path="/personalityTest/getAllResults"
//                 element={<PersonalityResultList />}
//               />
//             </Routes>
//           </main>

//           <Footer />

//           {/* 로그인 팝업 조건부 렌더링 */}
//           {isLoginPopupOpen && (
//             <Login
//               closePopup={closeLoginPopup}
//               onSignupClick={openSignupPopup}
//               onFindPasswordClick={openFindPasswordPopup}
//             />
//           )}

//           {/* 회원가입 팝업 조건부 렌더링 */}
//           {isSignupPopupOpen && <Signup closePopup={closeSignupPopup} />}

//           {/* 비밀번호 찾기 팝업 조건부 렌더링 */}
//           {isFindPasswordPopupOpen && (
//             <FindPassword
//               closePopup={(callback) => closeFindPasswordPopup(callback)}
//               onPasswordResetClick={openPasswordResetPopup}
//             />
//           )}

//           {/* 비밀번호 재설정 팝업 조건부 렌더링 */}
//           {isPasswordResetPopupOpen && 
//             <PasswordReset closePopup={closePasswordResetPopup} />}
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GlobalStyles from '../src/styles/global.js';

// 플랜 서비스
import Survey from './pages/plan/Survey';
import Produce from './pages/plan/Produce';
import Complete from './pages/plan/Complete';
import SurveyEdit from './pages/plan/modify/SurveyEdit.jsx';

// 게시물 관리
import Write from './pages/board/Write';
import Edit from './pages/board/Edit';
import List from './pages/board/List';
import Detail from './pages/board/Detail.jsx';

// 회원 관리
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import FindPassword from './pages/auth/FindPassword';
import PasswordReset from './pages/auth/PasswordReset';
import MyPage from './pages/auth/MyPage';
import MyPlan from './pages/auth/MyPlan';
import MyBoard from './pages/auth/MyBoard.jsx';
import ProfileEdit from './pages/auth/ProfileEdit.jsx';
import MyTest from './pages/auth/MyTest.jsx'; // 나의 유형검사

// 여행 유형 검사
import PersonalityTest from './pages/personality/Test.jsx';
import PersonalityResult from './pages/personality/Result.jsx';
import PersonalityResultList from './pages/personality/ResultList.jsx';

function App() {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
  const [isFindPasswordPopupOpen, setFindPasswordPopupOpen] = useState(false);
  const [isPasswordResetPopupOpen, setPasswordResetPopupOpen] = useState(false);
  const [email, setEmail] = useState(''); // 이메일 상태 추가

  const openLoginPopup = () => setLoginPopupOpen(true);
  const closeLoginPopup = () => setLoginPopupOpen(false);
  const openSignupPopup = () => setSignupPopupOpen(true);
  const closeSignupPopup = () => setSignupPopupOpen(false);

  const openFindPasswordPopup = () => setFindPasswordPopupOpen(true);
  const closeFindPasswordPopup = (callback) => {
    setFindPasswordPopupOpen(false);
    if (callback) {
      setTimeout(() => callback(), 300); // FindPassword 팝업이 닫힌 후 PasswordReset 팝업 열기
    }
  };

  const openPasswordResetPopup = () => {
    console.log('PasswordReset 팝업 열기');  // 로그 추가
    setPasswordResetPopupOpen(true);
  };
  const closePasswordResetPopup = () => setPasswordResetPopupOpen(false);

  return (
    <>
      <GlobalStyles />

      <Router>
        <div
          className={`App ${
            isLoginPopupOpen || isSignupPopupOpen || isFindPasswordPopupOpen || isPasswordResetPopupOpen
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

              {/* 플랜 서비스 */}
              <Route path="/plan/survey" element={<Survey />} />
              <Route path="/plan/produce" element={<Produce />} />
              <Route
                path="/plan/complete"
                element={<Complete onLoginClick={openLoginPopup} />}
              />
              <Route path="/plan/survey/:planId" element={<SurveyEdit />} />

              {/* 게시물 관리 */}
              <Route path="/board/write" element={<Write />} />
              <Route path="/board/edit/:boardId" element={<Edit />} />
              <Route path="/board/list" element={<List />} />
              <Route path="/board/detail/:boardId" element={<Detail />} />

              {/* 회원 관리 */}
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/findpassword" element={<FindPassword />} />
              <Route path="/auth/passwordreset" element={<PasswordReset />} />
              <Route path="/auth/mypage" element={<MyPage />} />
              <Route path="/auth/myplan" element={<MyPlan />} />
              <Route path="/auth/myboard" element={<MyBoard />} />
              <Route path="/auth/mytest" element={<MyTest />} />
              <Route path="/auth/profileEdit" element={<ProfileEdit />} />

              {/* 유형 테스트 */}
              <Route
                path="/personalityTest/test"
                element={<PersonalityTest />}
              />
              <Route
                path="/personalityTest/result"
                element={<PersonalityResult />}
              />
              <Route
                path="/personalityTest/result/:resultId"
                element={<PersonalityResult />}
              />
              <Route
                path="/personalityTest/getAllResults"
                element={<PersonalityResultList />}
              />
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
            <FindPassword
              closePopup={(callback) => closeFindPasswordPopup(callback)}
              onPasswordResetClick={(email) => {
                setEmail(email); // 이메일 설정
                closeFindPasswordPopup(() => openPasswordResetPopup()); // FindPassword 팝업 닫고 PasswordReset 팝업 열기
              }}
            />
          )}

          {/* 비밀번호 재설정 팝업 조건부 렌더링 */}
          {isPasswordResetPopupOpen && 
            <PasswordReset email={email} closePopup={closePasswordResetPopup} />}
        </div>
      </Router>
    </>
  );
}

export default App;
