import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import LoginStyles from '../../styles/auth/login';
import Button from '../../components/Button';

const Login = ({ closePopup, onSignupClick, onFindPasswordClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json' // 요청 헤더 설정
        }
      });
  
      const token = response.data.token;
      localStorage.setItem('token', token);
  
      console.log('로그인 성공:', token);
      closePopup(); 
      navigate('/');
    } catch (err) {
      setError('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
      console.error(err);
    }
  };
  

  return (
    <>
      <LoginStyles />
      <div className="login-popup-overlay">
        <div className="login-popup">
          <button className="close-button size_xxs pt_gy" onClick={closePopup}>닫기</button>
          <h2>로그인</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <div className="login-options">
              <button
                onClick={() => {
                  closePopup();
                  onFindPasswordClick();
                }}
                className="find-password-link"
              >
                비밀번호 찾기
              </button>
              <button
                onClick={() => {
                  closePopup();
                  onSignupClick();
                }}
                className="signup-link"
              >
                회원가입
              </button>
            </div>

            <Button color="blue" size="lg">확인</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;



/* mock 이용 */

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import LoginStyles from '../../styles/auth/login';
// import Button from '../../components/Button';

// const Login = ({ closePopup, onSignupClick, onFindPasswordClick }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [members, setMembers] = useState([]);

//   // member.json에서 데이터를 가져오는 useEffect
//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get('/mock/member.json');
//         setMembers(response.data.members);
//       } catch (err) {
//         console.error('mock 데이터를 가져오는데 실패했습니다:', err);
//       }
//     };
//     fetchMembers();
//   }, []);

//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     // 로그인 로직 처리
//     fetch('/mock/member.json')
//       .then((response) => response.json())
//       .then((data) => {
//         const member = data.members.find((member) => member.email === email && member.password === password);
//         if (member) {
//           localStorage.setItem('token', 'mock-token');
//           alert('로그인 성공!'); // 로그인 성공 알림 추가
  
//           // 로그인 성공 시 메인 페이지로 이동
//           window.location.href = '/';  // 메인 페이지 경로로 이동 (예: /main)
//         } else {
//           alert('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
//         }
//       });
//   };
  
//   return (
//     <>
//       <LoginStyles />
//       <div className="login-popup-overlay">
//         <div className="login-popup">
//           <button className="close-button size_xxs pt_gy" onClick={closePopup}>닫기</button>
//           <h2>로그인</h2>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <div className="input-group">
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="이메일"
//                 value={email}
//                 onChange={handleEmailChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="비밀번호"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 required
//               />
//             </div>

//             {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

//             <div className="login-options">
//               <button
//                 type="button" // 폼 제출과 연관되지 않도록 type="button" 추가
//                 onClick={() => {
//                   closePopup();
//                   onFindPasswordClick();
//                 }}
//                 className="find-password-link"
//               >
//                 비밀번호 찾기
//               </button>
//               <button
//                 type="button" // 폼 제출과 연관되지 않도록 type="button" 추가
//                 onClick={() => {
//                   closePopup();
//                   onSignupClick();
//                 }}
//                 className="signup-link"
//               >
//                 회원가입
//               </button>
//             </div>


//             <Button color="blue" size="lg">확인</Button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

