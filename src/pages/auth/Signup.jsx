import React, { useState } from 'react';
import SignupStyles from '../../styles/auth/Signup'; // SignupStyles import

function Signup() {
  const [setSignupOpen] = useState(false);

  const closeSignup = () => setSignupOpen(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

  const [selectedYear, setSelectedYear] = useState("");  // 기본값 ""로 설정
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직 처리
  };

  return (
    <>
      <SignupStyles /> 
      <div className="signup-popup-overlay">
        <div className="signup-popup">
          <button className="close-button" onClick={closeSignup}>X</button>
          <h2>회원가입</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="email" id="email" className="input-small" placeholder="이메일" required />
              <button type="button" className="btn_wht" onClick={handleSubmit}>확인</button>
            </div>

            <div className="input-group">
              <input type="text" id="name" className="input-small" placeholder="이름" required />
              <button type="button" className="btn_wht" onClick={handleSubmit}>확인</button>
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
              <input type="password" id="passwordConfirm" className="input-large" placeholder="비밀번호 확인" required />
            </div>

            {/* 생년월일 필드 */}
            <div className="input-group date-dropdown">
              <select value={selectedYear} onChange={handleYearChange} required>
                <option value="" disabled>년도</option>  {/* 기본 선택값 */}
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>

              <select value={selectedMonth} onChange={handleMonthChange} required>
                <option value="" disabled>월</option>  {/* 기본 선택값 */}
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>

              <select value={selectedDay} onChange={handleDayChange} required>
                <option value="" disabled>일</option>  {/* 기본 선택값 */}
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
            <button type="submit" className="btn_blk">회원가입</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
