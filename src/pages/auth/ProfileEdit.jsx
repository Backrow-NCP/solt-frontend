import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileEditStyles from '../../styles/auth/profileEdit'; // ProfileEditStyles import
import Button from '../../components/Button';
import profileImage from '../../assets/images/ico/profile.png'; // 기본 프로필 이미지 경로
import apiClient from '../../config/AxiosConfig'; // apiClient를 불러옵니다.

function ProfileEdit() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isNameValid, setIsNameValid] = useState(null); // 이름 유효성 검사 상태 추가
  const [imagePreview, setImagePreview] = useState(profileImage); // 이미지 미리보기 상태 추가

  const navigate = useNavigate();  // 페이지 이동을 위한 훅

  // 이름, 이메일, 비밀번호 등의 상태
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인 상태

  // /member API 호출을 통해 사용자 정보 불러오기
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setIsLoading(true); // 로딩 상태 시작
        const response = await apiClient.get('/members'); // apiClient를 사용하여 인증된 요청 전송
        const user = response.data;
        setLoggedInUser(user);
        setName(user.name);
        setEmail(user.email);
        setImagePreview(user.profileImage || profileImage);
        setIsLoading(false); // 로딩 상태 종료
      } catch (error) {
        console.error('Error fetching member data:', error);
        setIsLoading(false); // 에러 발생 시 로딩 종료
      }
    };

    fetchMemberData();
  }, []);

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

  // 이름 유효성 검사 함수
  const handleNameCheck = async () => {
    const name = document.getElementById('name').value;
  
    try {
      // /login/check API 호출로 이름 유효성 검사
      const response = await apiClient.post('/login/check', { name });
  
      if (response.data.isValid) {  // API 응답에 따라 유효성 처리
        setIsNameValid(true);
        window.alert('사용 가능한 이름입니다.');
      } else {
        setIsNameValid(false);
        window.alert('이미 존재하는 이름입니다.');
      }
    } catch (error) {
      console.error('Error checking name:', error);
      window.alert('이름 확인 중 오류가 발생했습니다.');
    }
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
            <Link to="#" className="size_xs profile_edit" onClick={handleProfileDelete}>프로필 삭제</Link>
          </div>

          <div className="edit_form">
            {/* 이메일 비활성화 */}
            <div className="input_group">
              <input type="email" id="email" className="input_small" value={email} readOnly disabled />
            </div>

            {/* 이름 필드 */}
            <div className="input_group">
              <input
                type="text"
                id="name"
                className="input_small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                required
              />
              <Button color="white" size="sm" onClick={handleNameCheck}>확인</Button>

            </div>

            {/* 비밀번호 필드 */}
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
              <input type="password" id="passwordConfirm" className="input_large" placeholder="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
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
