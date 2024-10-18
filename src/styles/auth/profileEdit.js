import { createGlobalStyle } from 'styled-components';

const ProfileEditStyles = createGlobalStyle`
  .edit_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    max-width: 1600px;
    margin: 80px auto 0;
  }

  .edit_header {
    text-align: center;
    margin-bottom: 20px;
  }

  .edit_content {
    display: flex;
    justify-content: center;
  }

  /* 프로필 이미지 및 관리 버튼을 세로로 정렬 */
.profile_image_container {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  cursor: pointer; /* 마우스를 올렸을 때 포인터 변경 */
}

.profile_image {
  width: 100%;
  max-width: 250px;
  height: 250px; /* 고정 높이 추가 */
  border-radius: 50%;
  background-color: #fff;
  object-fit: cover; /* 이미지를 컨테이너에 맞춰 자르면서 비율 유지 */
}

.profile_edit {
  margin-top: 10px; /* 이미지와 간격 */
  color: #000000;
  text-decoration: none;
}

  .edit_form {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .input_group {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input_group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
  }

  .input_small {
    width: 70%;
  }

  .input_group button {
    margin-left: 10px;
    justify-content: center;
  }

  

  .date_dropdown {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .date_dropdown select {
    width: 32%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    appearance: none;
    background-color: white;
    background-image: url('data:image/svg+xml;base64,...');
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) center;
    background-size: 12px;
    padding-right: 30px;
    color: #666;
    text-align: right;
  }

  /* 성별 선택 라디오 버튼 스타일 */
  .gender_group {
    display: flex;  /* 성별 라디오 버튼을 가로로 배치 */
    gap: 40px;  /* 남자, 여자 사이 간격 */
    align-items: center;
    justify-content: center;
  }

  .gender_group > div {
    display: flex;
    align-items: center;  /* 라디오 버튼과 레이블을 나란히 정렬 */
  }

  .gender_group label {
    margin-left: 5px;  /* 라디오 버튼과 레이블 간의 간격 */
    font-size: 16px;
  }

  /* 반응형 설정 */
@media (max-width: 1024px) {

  .profile_image {
    max-width: 150px;
  }
}
`;

export default ProfileEditStyles;
