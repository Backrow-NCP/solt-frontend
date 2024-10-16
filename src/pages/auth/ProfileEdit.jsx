import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileEditStyles from '../../styles/auth/profileEdit'; // ProfileEditStyles import
import Button from '../../components/Button';
import profileImage from '../../assets/images/ico/profile.png'; // 기본 프로필 이미지 경로

function ProfileEdit() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

  const loggedInUserId = 1;
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isNameValid, setIsNameValid] = useState(null); // 이름 유효성 검사 상태 추가
  const [imagePreview, setImagePreview] = useState(profileImage); // 이미지 미리보기 상태 추가

  const navigate = useNavigate();  // 페이지 이동을 위한 훅

  useEffect(() => {
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
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인 상태

  // 파일 선택 시 이미지 미리보기 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // 이미지 미리보기 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 변환
    }
  };

  const handleProfileDelete = () => {
    // 기본 프로필 이미지로 변경
    setImagePreview(profileImage); // profileImage는 기본 이미지 경로
  };

  const handleNameCheck = async () => {
    const name = document.getElementById('name').value;

    // 가짜 응답 사용
    setTimeout(() => {
      const fakeResponse = name.length > 0; // 이름 길이가 0보다 크면 사용 가능으로 설정 (가짜 논리)
      setIsNameValid(fakeResponse);
      if (fakeResponse) {
        window.alert('사용 가능한 이름입니다.');
      } else {
        window.alert('이미 존재하는 이름입니다.');
      }
    }, 1000); // 1초 후에 가짜 응답 처리
  };

  // 생년월일 선택 변경 처리 함수 (비활성화되어 있음)
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

  // 성별 변경 처리 함수 (비활성화되어 있음)
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이름 유효성 검사
    if (isNameValid === false) {
      window.alert('이름 유효성을 확인해주세요.');
      return;
    }

    // 비밀번호가 입력된 경우에만 검사
    if (password) {
      // 비밀번호 유효성 검사 (예시: 특수문자 포함 8자 이상)
      if (password.length < 8 || !/\W/.test(password)) {
        window.alert('비밀번호는 8자 이상이어야 하며 특수문자가 포함되어야 합니다.');
        return;
      }

      // 비밀번호와 비밀번호 확인란이 동일한지 확인
      if (password !== passwordConfirm) {
        window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
    }

    // 성공적으로 수정된 경우
    window.alert('프로필 수정이 성공적으로 완료되었습니다!');
    
    // MyPage로 이동
    navigate('/auth/mypage2');
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
            <label htmlFor="profileImageInput">
              <img src={imagePreview} alt="프로필 이미지" className="profile-image" />
            </label>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              style={{ display: 'none' }} // 파일 선택 input을 숨김
              onChange={handleImageChange}
            />
            <Link to="#" className="size_xs profile-edit" onClick={handleProfileDelete}>프로필 삭제</Link>
          </div>

          <div className="edit-form">
            {/* 이메일 비활성화 */}
            <div className="input-group">
              <input type="email" id="email" className="input-small" value={email} readOnly disabled />
            </div>

            <div className="input-group">
              <input
                type="text"
                id="name"
                className="input-small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                required
              />
              <Button color="white" size="sm" onClick={handleNameCheck}>확인</Button>

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
            <Button color="blue" size="lg" onClick={handleSubmit}>확인</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
