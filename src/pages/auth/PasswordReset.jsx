import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordResetStyles from '../../styles/auth/passwordReset';
import Button from '../../components/Button';
import axios from 'axios';
import closeIcon from '../../assets/images/ico/btn_close.svg'; // 닫기 아이콘 이미지 불러오기

const PasswordReset = ({ closePopup, email }) => {  // email을 props로 받음
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("PasswordReset에서 받은 email:", email); // 이메일이 제대로 전달되었는지 확인
  }, [email]);

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        // /members/password API 호출
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/members/password`, {
          email,   // email로 요청
          password: newPassword, // 새 비밀번호
        }, {
          headers: {
            'Content-Type': 'application/json', // JSON 형식으로 요청
          },
        });

        if (response.status === 200) {
          window.alert('비밀번호 설정이 완료되었습니다. 재로그인 해주세요.');
          closePopup();
          navigate('/');
        }
      } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        window.alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      window.alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <PasswordResetStyles />
      <div className="password_reset_popup_overlay">
        <div className="password_reset_popup">
          <button className="close_button" onClick={closePopup}>
            <img src={closeIcon} alt="닫기" className="close_icon" /> {/* 이미지로 닫기 버튼 대체 */}
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
