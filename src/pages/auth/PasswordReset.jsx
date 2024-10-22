import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import PasswordResetStyles from '../../styles/auth/passwordReset'; // PasswordReset 스타일 import
import Button from '../../components/Button';

const PasswordReset = ({ closePopup }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 추가

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log('새 비밀번호:', newPassword, '비밀번호 확인:', confirmPassword);
      window.alert('비밀번호 설정이 완료되었습니다. 재로그인 해주세요.');
      
      // closePopup이 정상적으로 호출되는지 확인
      if (typeof closePopup === 'function') {
        closePopup(); // 팝업 닫기
      }
      navigate('/'); // 메인 페이지로 이동
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <PasswordResetStyles /> {/* 글로벌 스타일 적용 */}
      <div className="password_reset_popup_overlay">
        <div className="password_reset_popup">
          <button className="close_button size_xxs pt_gy" onClick={closePopup}>
            닫기
          </button>
          <h2>새 비밀번호</h2>
          <form className="password_reset_form" onSubmit={handleSubmit}>
            <div className="input_group">
              <input
                type="password"
                id="newPassword"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>

            <div className="input_group">
              <input
                type="password"
                id="confirmPassword"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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

export default PasswordReset;
