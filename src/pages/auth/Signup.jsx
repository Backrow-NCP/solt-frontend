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
      // 중복된 이메일인 경우 true 반환, 따라서 false가 유효한 이메일
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
      const response = await axios.get(`http://localhost:80/login/check?value=${name}&type=name`);
      // 중복된 이름인 경우 true 반환, 따라서 false가 유효한 이름
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

/* mock 이용한 임시 코드 */

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SignupStyles from '../../styles/auth/signup'; // SignupStyles import
// import Button from '../../components/Button';

// function Signup({ closePopup }) {
//   const navigate = useNavigate(); // useNavigate 훅 사용
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);
//   const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

//   const [selectedYear, setSelectedYear] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedDay, setSelectedDay] = useState('');
//   const [gender, setGender] = useState('');

//   const [isEmailValid, setIsEmailValid] = useState(null);
//   const [isNameValid, setIsNameValid] = useState(null);

//   const handleYearChange = (e) => {
//     const year = e.target.value;
//     setSelectedYear(year);
//     updateDays(year, selectedMonth);
//   };

//   const handleMonthChange = (e) => {
//     const month = e.target.value;
//     setSelectedMonth(month);
//     updateDays(selectedYear, month);
//   };

//   const handleDayChange = (e) => {
//     const day = e.target.value;
//     setSelectedDay(day);
//   };

//   const updateDays = (year, month) => {
//     if (year && month) {
//       const daysInMonth = new Date(year, month, 0).getDate();
//       setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
//     }
//   };

//   const handleGenderChange = (e) => {
//     setGender(e.target.value);
//   };

//   const handleEmailCheck = async () => {
//     const email = document.getElementById('email').value;

//     // 서버 대신 가짜 응답 사용
//     const fakeResponse = true; // 여기서 이메일 중복 여부 결정
//     setIsEmailValid(fakeResponse);
//     if (fakeResponse) {
//       window.alert('사용 가능한 이메일입니다.');
//     } else {
//       window.alert('이미 존재하는 이메일입니다.');
//     }
//   };

//   const handleNameCheck = async () => {
//     const name = document.getElementById('name').value;

//     // 서버 대신 가짜 응답 사용
//     const fakeResponse = true; // 여기서 이름 중복 여부 결정
//     setIsNameValid(fakeResponse);
//     if (fakeResponse) {
//       window.alert('사용 가능한 이름입니다.');
//     } else {
//       window.alert('이미 존재하는 이름입니다.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 유효성 확인 후 이메일 및 이름이 확인된 경우에만 제출
//     if (isEmailValid === null) {
//       window.alert('이메일 유효성을 확인해주세요.');
//       return;
//     }
    
//     if (isNameValid === null) {
//       window.alert('이름 유효성을 확인해주세요.');
//       return;
//     }

//     if (!isEmailValid) {
//       window.alert('유효하지 않은 이메일입니다.');
//       return;
//     }

//     if (!isNameValid) {
//       window.alert('유효하지 않은 이름입니다.');
//       return;
//     }

//     const birthYear = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

//     const signupData = {
//       email: document.getElementById('email').value,
//       name: document.getElementById('name').value,
//       password: document.getElementById('password').value,
//       birthYear: birthYear,
//       gender: gender === 'male' ? true : false // Boolean으로 변환
//     };

//     // 가짜 응답
//     window.alert('회원가입이 성공적으로 완료되었습니다!');
//     navigate('/');
//     closePopup();
//   };

//   return (
//     <>
//       <SignupStyles />
//       <div className="signup-popup-overlay">
//         <div className="signup-popup">
//           <button className="close-button size_xxs pt_gy" onClick={closePopup}>닫기</button>
//           <h2>회원가입</h2>
//           <form className="signup-form" onSubmit={handleSubmit}>
//             <div className="input-group">
//               <input type="email" id="email" className="input-small" placeholder="이메일" required />
//               <Button color="white" size="sm" onClick={handleEmailCheck}>확인</Button>
//             </div>
//             <div className="input-group">
//               <input type="text" id="name" className="input-small" placeholder="이름" required />
//               <Button color="white" size="sm" onClick={handleNameCheck}>확인</Button>
//             </div>
//             <div className="input-group">
//               <input type="password" id="password" className="input-large" placeholder="비밀번호(특수문자 포함 8~20자)" required />
//             </div>
//             <div className="input-group">
//               <input type="password" id="passwordConfirm" className="input-large" placeholder="비밀번호 확인" required />
//             </div>
//             <div className="input-group date-dropdown">
//               <select value={selectedYear} onChange={handleYearChange} required>
//                 <option value="" disabled>년도</option>
//                 {years.map((year) => (
//                   <option key={year} value={year}>
//                     {year}년
//                   </option>
//                 ))}
//               </select>
//               <select value={selectedMonth} onChange={handleMonthChange} required>
//                 <option value="" disabled>월</option>
//                 {months.map((month) => (
//                   <option key={month} value={month}>
//                     {month}월
//                   </option>
//                 ))}
//               </select>
//               <select value={selectedDay} onChange={handleDayChange} required>
//                 <option value="" disabled>일</option>
//                 {days.map((day) => (
//                   <option key={day} value={day}>
//                     {day}일
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="input-group">
//               <div className="gender-group">
//                 <div>
//                   <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
//                   <label htmlFor="male">남자</label>
//                 </div>
//                 <div>
//                   <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
//                   <label htmlFor="female">여자</label>
//                 </div>
//               </div>
//             </div>
//             <Button color="blue" size="lg">회원가입</Button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Signup;
