import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios import 추가
import SignupStyles from '../../styles/auth/signup'; // SignupStyles import
import Button from '../../components/Button';

function Signup({ closePopup }) {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [gender, setGender] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isNameValid, setIsNameValid] = useState(null);

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

  const handleEmailCheck = async () => {
    const email = document.getElementById('email').value;
    try {
      const response = await axios.get(`http://localhost:80/login/check?value=${email}&type=email`);
      setIsEmailValid(response.data.result);
      if (response.data.result) {
        window.alert('사용 가능한 이메일입니다.');
      } else {
        window.alert('이미 존재하는 이메일입니다.');
      }
    } catch (error) {
      console.error('이메일 확인 오류:', error);
    }
  };

  const handleNameCheck = async () => {
    const name = document.getElementById('name').value;
    try {
      const response = await axios.get(`http://localhost:80/login/check?value=${name}&type=name`);
      setIsNameValid(response.data.result);
      if (response.data.result) {
        window.alert('사용 가능한 이름입니다.');
      } else {
        window.alert('이미 존재하는 이름입니다.');
      }
    } catch (error) {
      console.error('이름 확인 오류:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isEmailValid || !isNameValid) {
      window.alert('이메일과 이름의 유효성을 먼저 확인해주세요.');
      return;
    }
  
    const birthYear = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
  
    const signupData = {
      email: document.getElementById('email').value,
      name: document.getElementById('name').value,
      password: document.getElementById('password').value,
      birthYear: birthYear,
      gender: gender === 'male' ? true : false // Boolean으로 변환
    };
  
    try {
      const response = await axios.post('http://localhost:80/login/register', signupData);
      window.alert('회원가입이 성공적으로 완료되었습니다!');
      navigate('/');
      closePopup();
    } catch (error) {
      console.error('회원가입 실패:', error);
      window.alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
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
              <Button color="white" size="sm" onClick={handleEmailCheck}>확인</Button>
            </div>
            <div className="input-group">
              <input type="text" id="name" className="input-small" placeholder="이름" required />
              <Button color="white" size="sm" onClick={handleNameCheck}>확인</Button>
            </div>
            <div className="input-group">
              <input type="password" id="password" className="input-large" placeholder="비밀번호(특수문자 포함 8~20자)" required />
            </div>
            <div className="input-group">
              <input type="password" id="passwordConfirm" className="input-large" placeholder="비밀번호 확인" required />
            </div>
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
            <div className="input-group">
              <div className="gender-group">
                <div>
                  <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
                  <label htmlFor="male">남자</label>
                </div>
                <div>
                  <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
                  <label htmlFor="female">여자</label>
                </div>
              </div>
            </div>
            <Button color="blue" size="lg">회원가입</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
