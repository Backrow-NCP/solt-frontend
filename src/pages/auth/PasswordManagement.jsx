import React, { useState } from 'react';
import FindPassword from './FindPassword';
import PasswordReset from './PasswordReset';

const PasswordManagement = ({ closePopup }) => {
  // 이메일과 팝업 상태를 관리하는 상태
  const [email, setEmail] = useState('');
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);

  // 이메일을 업데이트하고 PasswordReset 팝업을 여는 함수
  const handlePasswordResetClick = (verifiedEmail) => {
    setEmail(verifiedEmail);
    setIsPasswordResetOpen(true);  // PasswordReset 팝업 열기
  };

  // PasswordReset 팝업을 닫는 함수
  const closePasswordResetPopup = () => {
    setIsPasswordResetOpen(false);  // PasswordReset 팝업 닫기
    closePopup();  // 부모 컴포넌트에서 받은 closePopup 함수 호출 (전체 팝업 닫기)
  };

  return (
    <div>
      {!isPasswordResetOpen ? (
        <FindPassword
          onPasswordResetClick={handlePasswordResetClick}
          closePopup={closePopup}  // FindPassword 팝업 닫기
        />
      ) : (
        <PasswordReset
          email={email}  // 인증된 이메일 전달
          closePopup={closePasswordResetPopup}  // PasswordReset 팝업 닫기
        />
      )}
    </div>
  );
};

export default PasswordManagement;
