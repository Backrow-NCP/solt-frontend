import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileEditStyles from '../../styles/auth/profileEdit'; // ProfileEditStyles import
import Button from '../../components/Button';
import profileImage from '../../assets/images/ico/profile.png'; // 기본 프로필 이미지 경로
import apiClient from '../../config/AxiosConfig'; // apiClient를 불러옵니다.

function ProfileEdit() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [gender, setGender] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isNameValid, setIsNameValid] = useState(null); // 이름 유효성 검사 상태 추가
  const [imagePreview, setImagePreview] = useState(profileImage); // 이미지 미리보기 상태 추가
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 추가

  const [name, setName] = useState('');
  const [password, setPassword] = useState(''); // 새로운 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // 기존 비밀번호

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setIsLoading(true);

        // 로컬 스토리지에서 JWT 토큰 가져오기
        const token = localStorage.getItem('token');
        console.log(token); // 토큰 값 출력

        if (token) {
          const response = await apiClient.get('/members', {
            headers: {
              Authorization: token,
            },
          });

          const user = response.data;
          console.log('Fetched user data:', user);

          setLoggedInUser(user);

          // 서버에서 받은 파일 이름으로 프로필 이미지 URL 구성 (fileName이 있을 경우만 설정)
          const profileImageUrl = user.fileName 
            ? `${process.env.REACT_APP_PROFILE_IMAGE_BASE_URL}${user.fileName}` 
            : profileImage;  // fileName이 없을 경우 기본 이미지 사용
          
          console.log('Final profileImage URL:', profileImageUrl); // URL을 확인
          setImagePreview(profileImageUrl); // 이미지 미리보기 설정

          // 사용자 정보 설정
          const birthDate = new Date(user.birthYear);
          setSelectedYear(birthDate.getFullYear());
          setSelectedMonth(birthDate.getMonth() + 1);
          setSelectedDay(birthDate.getDate());
          setGender(user.gender ? 'male' : 'female');
          setName(user.name);

          // 기존 비밀번호 저장 (기존 비밀번호는 서버로부터 받아옴)
          setCurrentPassword(user.password);

          // 프로필 이미지 URL을 로컬스토리지에 저장
          localStorage.setItem('profileImage', profileImageUrl); 
        } else {
          console.error('No token found, redirecting to login...');
          navigate('/auth/login');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching member data:', error);
        setIsLoading(false);
      }
    };

    fetchMemberData();
  }, [navigate]);

  // 파일 선택 시 이미지 미리보기 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // 이미지 파일 상태 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // 이미지 미리보기 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 변환
    }
  };

  // 프로필 이미지 삭제 요청 함수
  const handleProfileDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      // 서버로 DELETE 요청 전송
      const response = await apiClient.delete('/members/image', {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        // 프로필 이미지 삭제 성공 시 기본 이미지로 변경
        setImagePreview(profileImage); // 기본 프로필 이미지로 변경
        localStorage.removeItem('profileImage'); // 로컬스토리지에서 프로필 이미지 삭제
        window.alert('프로필 이미지가 성공적으로 삭제되었습니다.');
      } else {
        window.alert('프로필 이미지 삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('프로필 이미지 삭제 오류:', error);
      window.alert('프로필 이미지 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleNameCheck = async () => {
    const name = document.getElementById('name').value;
    
    try {
      // GET 요청으로 이름 유효성 확인
      const response = await apiClient.get('/login/check', {
        params: {
          value: name, // 이름 값 전달
          type: 'name', // 타입을 'name'으로 설정
        },
      });
  
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
  
    if (isNameValid === false) {
      window.alert('이름 유효성을 확인해주세요.');
      return;
    }
  
    // 비밀번호가 있을 경우만 유효성 검사
    if (password) {
      if (password.length < 8 || !/\W/.test(password)) {
        window.alert('비밀번호는 8자 이상이어야 하며 특수문자가 포함되어야 합니다.');
        return;
      }
  
      if (password !== passwordConfirm) {
        window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
    }
  
    try {
      const token = localStorage.getItem('token'); // 토큰을 가져옴
  
      // 이미지 파일이 있을 경우 서버로 전송
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
  
        const response = await apiClient.put('/members/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token'), // 토큰 추가
          },
        });
  
        // 서버에서 fileName 값을 받아 프로필 이미지 URL 생성
        const fileName = response.data.fileName;
        const updatedProfileImageUrl = `${process.env.REACT_APP_PROFILE_IMAGE_BASE_URL}${fileName}`;
  
        // localStorage에 새로운 프로필 이미지 URL 저장
        localStorage.setItem('profileImage', updatedProfileImageUrl);
  
        window.alert('프로필 이미지가 성공적으로 업데이트되었습니다!');
      }
  
      // 비어있는 password인 경우 기존 비밀번호로 설정
      const finalPassword = password ? password : currentPassword; // 비어있으면 currentPassword를 사용
  
      // 회원 정보 수정 요청 (이름과 비밀번호)
      const payload = {
        name: name,
        password: finalPassword, // 비어있을 경우 currentPassword가 전송됨
      };
  
      const modifyResponse = await apiClient.put('/members', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
  
      if (modifyResponse.status === 200) {
        window.alert('회원 정보가 성공적으로 수정되었습니다.');
      } else {
        window.alert('회원 정보 수정 중 오류가 발생했습니다.');
      }
  
      navigate('/auth/mypage');
    } catch (error) {
      if (error.response) {
        // 서버에서 반환한 응답 상태와 데이터 출력
        console.error('서버 상태 코드:', error.response.status);
        console.error('서버 응답 데이터:', error.response.data);
        console.error('서버 헤더:', error.response.headers);
      } else if (error.request) {
        // 요청이 서버에 도달했지만 응답을 받지 못한 경우 (네트워크 문제 등)
        console.error('요청은 서버로 전송되었으나 응답 없음:', error.request);
      } else {
        // 요청을 만들다가 발생한 오류
        console.error('요청 설정 중 오류 발생:', error.message);
      }
      console.error('전체 오류 정보:', error.config);  // 전체 오류 설정 정보
      window.alert('프로필 수정 중 오류가 발생했습니다.');
    }
  };

  const handleAccountDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        window.alert('로그인이 필요합니다.');
        navigate('/auth/login');
        return;
      }
  
      if (window.confirm('정말로 회원탈퇴를 하시겠습니까?')) {
        const response = await apiClient.delete('/members', {
          headers: {
            Authorization: token, // Bearer 토큰 전송
          },
        });
  
        if (response.status === 200) {
          localStorage.removeItem('token');
          window.alert('회원 탈퇴가 성공적으로 완료되었습니다.');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('회원 탈퇴 중 오류가 발생했습니다:', error);
      window.alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };
  
  
  

  
  
  
  

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  if (!loggedInUser) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>; // 데이터가 로드되지 않았을 때 표시
  }

  return (
    <>
      <ProfileEditStyles />
      <div className="edit_container">
        <div className="edit_header">
          <h2>프로필 수정</h2>
        </div>
        <div className="edit_content">
          {/* 이미지 및 프로필 수정 입력 폼 */}
          <div className="profile_image_container">
            <label htmlFor="profileImageInput">
              <img src={imagePreview} alt="프로필 이미지" className="profile_image" />
            </label>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              style={{ display: 'none' }} // 파일 선택 input을 숨김
              onChange={handleImageChange}
            />
            <Link to="#" className="size_xs profile_edit" onClick={handleProfileDelete}>
              프로필 삭제
            </Link>
          </div>

          <div className="edit_form">
            {/* 이메일 비활성화 */}
            <div className="input_group">
              <input type="email" id="email" className="input_small" value={loggedInUser.email} readOnly disabled />
            </div>

            {/* 이름 필드 */}
            <div className="input_group">
              <input
                type="text"
                id="name"
                className="input_small"
                value={name} // loggedInUser.name이 아닌 name 상태로 관리
                onChange={(e) => setName(e.target.value)} // name 상태를 업데이트
                placeholder="이름"
                required
              />
              <Button color="white" size="sm" onClick={handleNameCheck}>
                확인
              </Button>
            </div>

            <div className="input_group">
              <input
                type="password"
                id="password"
                className="input_large"
                placeholder="새 비밀번호(특수문자 포함 8~20자)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input_group">
              <input
                type="password"
                id="passwordConfirm"
                className="input_large"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            {/* 생년월일 필드 (비활성화 상태) */}
            <div className="input_group date_dropdown">
              <select value={selectedYear} disabled>
                <option value="" disabled>
                  년도
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
              <select value={selectedMonth} disabled>
                <option value="" disabled>
                  월
                </option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>
              <select value={selectedDay} disabled>
                <option value="" disabled>
                  일
                </option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}일
                  </option>
                ))}
              </select>
            </div>

            {/* 성별 필드 (비활성화 상태) */}
            <div className="input_group gender_group">
              <div>
                <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} disabled />
                <label htmlFor="male">남자</label>
              </div>
              <div>
                <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} disabled />
                <label htmlFor="female">여자</label>
              </div>
            </div>

            <div className="button_group">
              <div className="confirm_button">
                <Button color="blue" size="lg" onClick={handleSubmit}>
                  확인
                </Button>
              </div>              
              <div className="delete_button">
                <button onClick={handleAccountDelete}>
                  회원탈퇴
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
