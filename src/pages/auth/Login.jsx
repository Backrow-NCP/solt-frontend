import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiNoToken } from '../../config/AxiosConfig'; // apiNoToken 불러오기
import LoginStyles from '../../styles/auth/login';
import Button from '../../components/Button';
import PasswordManagement from './PasswordManagement.jsx';
import closeIcon from '../../assets/images/ico/btn_close.svg'; // 닫기 아이콘 이미지 불러오기

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

      // 서버 응답 확인 , 지워도 됨 ㅇㅇ
      console.log("로그인 응답:", response); 
      const token = response.headers['authorization'];
      const name = response.data.name;  // 서버에서 받은 사용자 이름
      const memberId = response.data.memberId; // 서버에서 받은 memberId

      // 서버로부터 응답이 정상적일 경우
      if (token) {
        localStorage.setItem('token', token);  // JWT 토큰 저장
        localStorage.setItem('username', name);  // 사용자 이름 저장
        // 저장된 토큰 콘솔 출력, 지워도 됨ㅇㅇ 
        console.log('Token saved:', token); 

        closePopup();  // 팝업 닫기
        navigate(0);  // 홈으로 리다이렉션
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
      <div className="login_popup_overlay">
        <div className="login_popup">
          <button className="close_button" onClick={closePopup}>
            <img src={closeIcon} alt="닫기" className="close_icon" /> {/* 이미지로 닫기 버튼 대체 */}
          </button>
          <h2>로그인</h2>
          <form className="login_form" onSubmit={handleSubmit}>
            <div className="input_group">
              <input
                type="email"
                id="email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="input_group">
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {error && <p className="error_message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <div className="login_options">
              <button
                type="button"
                onClick={() => {
                  closePopup();
                  onFindPasswordClick();
                }}
                className="find_password_link"
              >
                비밀번호 찾기
              </button>
              <button
                type="button"
                onClick={() => {
                  closePopup();
                  onSignupClick();
                }}
                className="signup_link"
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
