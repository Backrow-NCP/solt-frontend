import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordResetStyles from '../../styles/auth/passwordReset';
import Button from '../../components/Button';
import axios from 'axios';

const PasswordReset = ({ closePopup }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 userId 가져오기
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const token = localStorage.getItem('token'); // 토큰 가져오기
        console.log(token); // 토큰 값 출력 (디버깅용)

        if (token) {
          // /members API 호출
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/members`, {
            headers: {
              Authorization: token,
            },
          });

          console.log('API 응답:', response.data); // 응답 데이터 출력 (디버깅용)

          const { id } = response.data; // 서버에서 반환한 사용자 ID
          if (id) {
            setUserId(id); // userId 설정
          } else {
            throw new Error('userId를 가져오지 못했습니다.');
          }
        } else {
          throw new Error('토큰이 없습니다.');
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
        window.alert('사용자 정보를 가져오는 데 실패했습니다. 다시 로그인해주세요.');
        navigate('/login'); // 오류 발생 시 로그인 페이지로 이동
      }
    };

    fetchMemberData();
  }, [navigate]);

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        const token = localStorage.getItem('token'); // 토큰 가져오기

        if (!userId) {
          throw new Error('userId를 찾을 수 없습니다.');
        }

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/members/${userId}/password`, {
          password: newPassword,
        }, {
          headers: {
            Authorization: token, // Bearer 접두어 없이 토큰만 전달
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
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <PasswordResetStyles />
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
