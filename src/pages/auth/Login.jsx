import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiNoToken } from '../../config/AxiosConfig'; // apiNoToken 불러오기
import LoginStyles from '../../styles/auth/login';
import Button from '../../components/Button';

const Login = ({ closePopup, onSignupClick, onFindPasswordClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 로딩 시작
  
    try {
      // apiNoToken을 사용해 POST 요청으로 로그인 처리
      const response = await apiNoToken.post('/login', {
        email,
        password
      });

      // 서버로부터 응답이 정상적일 경우
      const { token } = response.data;  // 서버 응답에서 토큰 추출
      if (token) {
        localStorage.setItem('token', token);  // JWT 토큰 저장
        closePopup();  // 팝업 닫기
        navigate('/');  // 홈으로 리다이렉션
      } else {
        setError('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
      }
    } catch (err) {
      console.error(err);
      setError('서버와의 통신에 실패했습니다.');
    } finally {
      setIsLoading(false);  // 로딩 종료
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

            <Button color="blue" size="lg" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '확인'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
