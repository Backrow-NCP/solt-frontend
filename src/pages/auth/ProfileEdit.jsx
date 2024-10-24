import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiNoToken } from '../../config/AxiosConfig'; // apiNoToken을 사용하여 Axios 요청 처리
import SignupStyles from '../../styles/auth/signup';
import Button from '../../components/Button';
import closeIcon from '../../assets/images/ico/btn_close.svg';

function Signup({ closePopup }) {
  const navigate = useNavigate();
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
      // apiNoToken을 사용하여 이메일 중복 확인 요청
      const response = await apiNoToken.get(`/login/check?value=${email}&type=email`, {
        withCredentials: true, // 세션 또는 쿠키 정보를 요청에 포함
      });
      
      if (response.data.result) {
        setIsEmailValid(false);
        window.alert('이미 존재하는 이메일입니다.');
      } else {
        setIsEmailValid(true);
        window.alert('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      console.error('이메일 확인 오류:', error);
      window.alert('이메일 확인 중 문제가 발생했습니다.');
    }
  };

  const handleNameCheck = async () => {
    const name = document.getElementById('name').value;
    try {
      // apiNoToken을 사용하여 이름 중복 확인 요청
      const response = await apiNoToken.get(`/login/check?value=${name}&type=name`);
      if (response.data.result) {
        setIsNameValid(false);
        window.alert('이미 존재하는 이름입니다.');
      } else {
        setIsNameValid(true);
        window.alert('사용 가능한 이름입니다.');
      }
    } catch (error) {
      console.error('이름 확인 오류:', error);
      window.alert('이름 확인 중 문제가 발생했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
  
    if (password !== passwordConfirm) {
      window.alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    // 유효성 확인 후 이메일 및 이름이 확인된 경우에만 제출
    if (isEmailValid === false || isEmailValid === null) {
      window.alert('이메일의 유효성을 먼저 확인해주세요.');
      return;
    }
  
    if (isNameValid === false || isNameValid === null) {
      window.alert('이름의 유효성을 먼저 확인해주세요.');
      return;
    }
  
    const birthYear = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const signupData = {
      email: document.getElementById('email').value,
      name: document.getElementById('name').value,
      password: password,
      birthYear: birthYear,
      gender: gender === 'male' ? true : false // Boolean으로 변환
    };

    console.log(signupData); // 데이터 확인
  
    
    try {
      await apiNoToken.post('/login/register', signupData, {
        withCredentials: true // 쿠키 기반 인증 정보를 요청에 포함
      });
      // 서버 요청이 성공했다면 alert 실행
      window.alert('회원가입이 성공적으로 완료되었습니다!');
      navigate('/'); // 페이지 이동
      closePopup(); // 팝업 닫기
    } catch (error) {
      console.error('회원가입 실패:', error);
    
      // 서버가 반환한 에러 메시지가 있을 경우 이를 표시
      if (error.response && error.response.data && error.response.data.message) {
        window.alert(`회원가입에 실패했습니다: ${error.response.data.message}`);
      } else {
        window.alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }  
  };
  
  return (
    <>
      <SignupStyles />
      <div className="signup_popup_overlay">
        <div className="signup_popup">
          <button className="close_button" onClick={closePopup}>
            <img src={closeIcon} alt="닫기" className="close_icon" /> {/* 이미지로 닫기 버튼 대체 */}
          </button>
          <h2>회원가입</h2>
          <form className="signup_form" onSubmit={handleSubmit}>
            <div className="input_group">
              <input type="email" id="email" className="input_small" placeholder="이메일" required />
              <Button color="white" size="sm" onClick={handleEmailCheck}>확인</Button>
            </div>
            <div className="input_group">
              <input type="text" id="name" className="input_small" placeholder="이름" required />
              <Button color="white" size="sm" onClick={handleNameCheck}>확인</Button>
            </div>
            <div className="input_group">
              <input type="password" id="password" className="input_large" placeholder="비밀번호(특수문자 포함 8~20자)" required />
            </div>
            <div className="input_group">
              <input type="password" id="passwordConfirm" className="input_large" placeholder="비밀번호 확인" required />
            </div>
            <div className="input_group date_dropdown">
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
            <div className="input_group">
              <div className="gender_group">
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

