import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileEditStyles from '../../styles/auth/profileEdit'; // ProfileEditStyles import
import Button from '../../components/Button';
import profileImage from '../../assets/images/profile.png'; // 프로필 이미지를 불러오는 경로를 맞춰주세요

function ProfileEdit() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

  // 로그인된 사용자의 ID를 설정 (예시로 id: 1 사용)
  const loggedInUserId = 1;
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // member.json 파일을 public 폴더에서 불러오기
    fetch('/mock/member.json')
      .then((response) => response.json())
      .then((data) => {
        const user = data.members.find(member => member.id === loggedInUserId);
        setLoggedInUser(user);
        setSelectedYear(user.birthdate.year);
        setSelectedMonth(user.birthdate.month);
        setSelectedDay(user.birthdate.day);
        setGender(user.gender);
        setName(user.name);
        setEmail(user.email);
      })
      .catch((error) => console.error('Error fetching member data:', error));
  }, [loggedInUserId]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [gender, setGender] = useState('female');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  if (!loggedInUser) {
    return <div>Loading...</div>; // 데이터가 아직 로드되지 않았을 때 로딩 표시
  }

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
            {/* 이메일 비활성화 */}
            <div className="input-group">
              <input type="email" id="email" className="input-small" value={email} readOnly disabled />
            </div>

            <div className="input-group">
              <input type="text" id="name" className="input-small" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" required />
              <Button color="white" size="sm">확인</Button>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                className="input-large"
                placeholder="새 비밀번호(특수문자 포함 8~20자)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input type="password" id="passwordConfirm" className="input-large" placeholder="비밀번호 확인" required />
            </div>

            {/* 생년월일 비활성화 */}
            <div className="input-group date-dropdown">
              <select value={selectedYear} onChange={handleYearChange} required disabled>
                <option value="" disabled>년도</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>

              <select value={selectedMonth} onChange={handleMonthChange} required disabled>
                <option value="" disabled>월</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>

              <select value={selectedDay} onChange={handleDayChange} required disabled>
                <option value="" disabled>일</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}일
                  </option>
                ))}
              </select>
            </div>

            {/* 성별 선택 비활성화 */}
            <div className="input-group gender-group">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                  disabled
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
                  disabled
                />
                <label htmlFor="female">여자</label>
              </div>
            </div>

            {/* 확인 버튼 */}
            <Button color="blue" size="lg">확인</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
