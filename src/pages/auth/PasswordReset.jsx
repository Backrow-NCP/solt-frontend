import React, { useState } from 'react';
import PasswordResetStyles from '../../styles/auth/PasswordReset'; // PasswordReset 스타일 import
import Button from '../../components/Button';

const PasswordReset = ({ closePopup }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 재설정 로직 처리
    console.log('새 비밀번호:', newPassword, '비밀번호 확인:', confirmPassword);
  };

  return (
    <>
      <PasswordResetStyles /> {/* 글로벌 스타일 적용 */}
      <div className="password-reset-popup-overlay">
        <div className="password-reset-popup">
          <button className="close-button" onClick={closePopup}>X</button>
          <h2>새 비밀번호</h2>
          <form className="password-reset-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="password"
                id="newPassword"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </div>

            <div className="input-group">
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
