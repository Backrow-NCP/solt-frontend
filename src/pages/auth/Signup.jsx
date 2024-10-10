import React, { useState } from 'react';
import axios from 'axios'; // Axios import 추가
import SignupStyles from '../../styles/auth/signup'; // SignupStyles import
import Button from '../../components/Button';

function Signup({ closePopup }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [gender, setGender] = useState('');

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    updateDays(year, selectedMonth);
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    updateDays(selectedYear, month);
  };

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
  };

  const updateDays = (year, month) => {
    if (year && month) {
      const daysInMonth = new Date(year, month, 0).getDate();
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 회원가입에 필요한 데이터
    const signupData = {
      email: document.getElementById('email').value,
      name: document.getElementById('name').value,
      password: document.getElementById('password').value,
      passwordConfirm: document.getElementById('passwordConfirm').value,
      birthdate: {
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
      },
      gender: gender,
    };

    try {
      // 서버로 회원가입 요청 보내기
      const response = await axios.post('/api/signup', signupData);

      // 회원가입 성공 시 처리할 로직
      console.log('회원가입 성공:', response.data);
      closePopup(); // 팝업 닫기
    } catch (error) {
      // 회원가입 실패 시 에러 처리
      console.error('회원가입 실패:', error);
      // 오류 메시지를 사용자에게 표시할 수 있습니다.
    }
  };

  return (
    <>
      <SignupStyles />
      <div className="signup-popup-overlay">
        <div className="signup-popup">
          <button className="close-button size_xxs pt_gy" onClick={closePopup}>닫기</button>
          <h2>회원가입</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="email" id="email" className="input-small" placeholder="이메일" required />
              <Button color="white" size="sm">확인</Button>
            </div>

            <div className="input-group">
              <input type="text" id="name" className="input-small" placeholder="이름" required />
              <Button color="white" size="sm">확인</Button>
            </div>

            {/* 비밀번호 필드 */}
            <div className="input-group">
              <input
                type="password"
                id="password"
                className="input-large"
                placeholder="비밀번호(특수문자 포함 8~20자)"
                required
              />
            </div>

            {/* 비밀번호 확인 필드 */}
            <div className="input-group">
              <input
                type="password"
                id="passwordConfirm"
                className="input-large"
                placeholder="비밀번호 확인"
                required
              />
            </div>

            {/* 생년월일 필드 */}
            <div className="input-group date-dropdown">
              <select value={selectedYear} onChange={handleYearChange} required>
                <option value="" disabled>년도</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>

              <select value={selectedMonth} onChange={handleMonthChange} required>
                <option value="" disabled>월</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>

              <select value={selectedDay} onChange={handleDayChange} required>
                <option value="" disabled>일</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}일
                  </option>
                ))}
              </select>
            </div>

            {/* 성별 선택 필드 */}
            <div className="input-group">
              <div className="gender-group">
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="male">남자</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="female">여자</label>
                </div>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <Button color="blue" size="lg">회원가입</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
