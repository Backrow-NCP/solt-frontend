import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginStyles from '../../styles/auth/Login';
import Button from '../../components/Button';

const Login = ({ closePopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 서버에 로그인 요청을 보내는 부분
      const response = await axios.post('/api/login', { email, password });

      // 서버로부터 받은 JWT 토큰을 localStorage에 저장
      const token = response.data.token;
      localStorage.setItem('token', token);

      console.log('로그인 성공:', token);
      closePopup(); // 팝업 닫기
    } catch (err) {
      // 에러 처리
      setError('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
      console.error(err);
    }
  };

  return (
    <>
      <LoginStyles />
      <div className="login-popup-overlay">
        <div className="login-popup">
          <button className="close-button" onClick={closePopup}>X</button>
          <h2>로그인</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">이메일</label>
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
              <label htmlFor="password">비밀번호</label>
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
              <Link to="/auth/FindPassword" style={{ marginRight: '8px' }}>비밀번호 찾기</Link> /
              <Link to="/auth/signup" style={{ marginLeft: '8px' }}>회원가입</Link>
            </div>

            <Button color="black" size="lg">확인</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
