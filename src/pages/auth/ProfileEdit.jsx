import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileEditStyles from '../../styles/auth/ProfileEdit'; // ProfileEditStyles import
import Button from '../../components/Button';
import profileImage from '../../assets/images/profile.png'; // 프로필 이미지를 불러오는 경로를 맞춰주세요


function ProfileEdit() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [gender, setGender] = useState('female'); // 기본값을 여자

  // 생년월일 선택 변경 처리 함수
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

  // 성별 변경 처리 함수
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 프로필 수정 처리 로직
  };

  return (
    <>
      <ProfileEditStyles /> 
      <div className="edit-container">
        <div className="edit-header">
          <h2>프로필 수정</h2>
        </div>
        <div className="edit-content">
          {/* 이미지 및 프로필 수정 입력 폼 */}

          <div className="profile-image-container">
            <img src={profileImage} alt="프로필 이미지" className="profile-image" />
             <Link to="/auth/profileEdit" className="size_xs profile-edit">프로필 삭제</Link>
          </div>

          <div className="edit-form">
            <div className="input-group">
              <input type="email" id="email" className="input-small" value="test1234@gmail.com" readOnly />
            </div>

            <div className="input-group">
              <input type="text" id="name" className="input-small" placeholder="이름" required />
              <Button color="white" size="sm">확인</Button>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                className="input-large"
                placeholder="새 비밀번호(특수문자 포함 8~20자)"
                required
              />
            </div>

            <div className="input-group">
              <input type="password" id="passwordConfirm" className="input-large" placeholder="비밀번호 확인" required />
            </div>

            {/* 생년월일 */}
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

            {/* 성별 선택 */}
            <div className="input-group gender-group">
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

            {/* 확인 버튼 */}
            <Button color="black" size="lg">확인</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
