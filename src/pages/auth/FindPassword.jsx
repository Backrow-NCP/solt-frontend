import React, { useState } from 'react';
import FindPasswordStyles from '../../styles/auth/findPassword';
import Button from '../../components/Button';

const FindPassword = ({ closePopup }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 찾기 로직 처리
    console.log('이메일:', email, '인증번호:', code);
  };

  return (
    <>
      <FindPasswordStyles /> {/* 글로벌 스타일 적용 */}
      <div className="find-password-popup-overlay">
        <div className="find-password-popup">
          <button className="close-button size_xxs pt_gy" onClick={closePopup}>닫기</button>
          <h2>비밀번호 찾기</h2>
          <form className="find-password-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="이메일 주소로 인증번호를 보내드립니다."
                value={email}
                onChange={handleEmailChange}
                required
              />
              <Button color="white" size="sm">확인</Button>
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="인증번호를 입력해주세요."
                value={code}
                onChange={handleCodeChange}
                required
              />
            </div>

            <Button color="blue" size="sm">확인</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FindPassword;
