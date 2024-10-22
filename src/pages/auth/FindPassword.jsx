import React, { useState } from 'react';
import axios from 'axios';
import FindPasswordStyles from '../../styles/auth/findPassword';
import Button from '../../components/Button';

const FindPassword = ({ closePopup, onPasswordResetClick }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 전송 여부 상태 관리
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지 상태 추가

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);

  // 이메일 인증번호 전송 함수
  const sendVerificationCode = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/email/verification-requests`, null, {
        params: { email },
      });
      if (response.status === 200) {
        setIsCodeSent(true); // 인증번호 전송 성공 시 상태 업데이트
        setSuccessMessage('인증번호가 이메일로 발송되었습니다. 이메일을 확인해주세요.');
        window.alert('인증번호가 이메일로 발송되었습니다. 이메일을 확인해주세요.'); // 알림창 띄우기
        console.log('인증번호 전송 성공:', response.data);
      }
    } catch (error) {
      console.error('인증번호 전송 실패:', error);
      setErrorMessage('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 인증번호 확인 함수
  const verifyCode = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/email/verifications`, {
        params: { email, code },
      });
      if (response.status === 200 && response.data.result) {
        console.log('인증 성공:', response.data);
        
        // 이메일 인증 성공 후 사용자 정보를 가져옴 (토큰 없이 요청)
        const memberResponse = await axios.get(`${process.env.REACT_APP_API_URL}/members`, {
          params: { email }, // 이메일로 회원 정보 조회         
        });
  
        if (memberResponse.status === 200) {
          const userId = memberResponse.data.id; // 사용자 ID 가져오기
          onPasswordResetClick(userId); // ID를 PasswordReset 팝업으로 전달
        }
      }
    } catch (error) {
      console.error('인증 실패:', error);
    }
  };

  // "확인" 버튼 눌렀을 때 이메일로 인증번호 전송
  const handleSendCode = (e) => {
    e.preventDefault();
    sendVerificationCode();
  };

  // "재설정" 버튼 눌렀을 때 인증번호 확인
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyCode(); // 인증번호 확인 후 PasswordReset 팝업 열기
  };

  return (
    <>
      <FindPasswordStyles /> {/* 글로벌 스타일 적용 */}
      <div className="find_password_popup_overlay">
        <div className="find_password_popup">
          <button className="close_button size_xxs pt_gy" onClick={closePopup}>
            닫기
          </button>
          <h2>비밀번호 찾기</h2>

          {/* 이메일 전송 폼 */}
          <form className="find_password_form" onSubmit={handleSendCode}>
            <div className="input_group">
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
          </form>

          {/* 인증번호 입력 칸 */}
          <form className="find_password_form" onSubmit={handleSubmit}>
            <div className="input_group">
              <input
                type="text"
                placeholder="인증번호를 입력해주세요."
                value={code}
                onChange={handleCodeChange}
                required
              />
            </div>
            <Button color="blue" size="sm">재설정</Button>
          </form>

          {errorMessage && <p className="error_message">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default FindPassword;
