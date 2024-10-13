import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1600px;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 8px;
  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s;
  color: black;
  margin-top: 10px;

  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

export const ContentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  color: black;
  height: 300px;
  resize: none;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #999;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 80vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative; /* 부모 요소에 상대 위치 추가 */
`;

export const Title = styled.h3`
  font-family: 'Paperlogy', sans-serif;
  font-size: 24px;
  text-align: center;
`;

export const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  margin-left: 5px;
`;

export const PlanStyledBox = styled.div`
  width: 100%;
  min-height: 150px; /* 플랜 박스 높이 */
  line-height: 20px;
  border: 2px solid #9999; /* 테두리 색상 */
  border-radius: 5px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center; /* 수평 중앙 정렬 */
  color: #999;
`;

export const ImageStyledBox = styled.div`
  width: 100%;
  min-height: 110px;
  
  border: 2px solid #9999;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  color: #999;
  overflow-x: auto; /* 좌우 스크롤 허용 */
  overflow-y: hidden; /* 세로 스크롤 방지 */
  white-space: nowrap; /* 이미지들을 한 줄로 정렬 */
  // padding-top: ${props => (props.scrollable ? '5px' : '0')};
  padding-left: 10px; /* 왼쪽 패딩 추가 */
`;

export const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 110px; /* 고정된 썸네일 크기 */
  height: 110px; /* 고정된 썸네일 크기 */
  margin-right: 10px; /* 이미지 간격 */
`;

export const ImageThumbnail = styled.img`
  width: 110px; /* 고정된 이미지 크기 */
  height: 110px; /* 고정된 이미지 크기 */
  object-fit: cover;
  padding: 10px 0px;
`;

export const InputLabel = styled.label`
  padding: 5px 10px;
  font-size: 12px;
  font-family: 'Paperlogy', sans-serif;
  color: black;
  border: 2px solid black;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 10px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 15px;
  right: 5px;
  background: rgba(255, 255, 255, 0.5); /* 투명도 있는 흰색 배경 */
  border: none;
  color: black;
  border-radius: 50%;
  cursor: pointer;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8); /* 호버 시 약간 더 밝게 */
  }
`;

export const RemoveAllButton = styled.button`
  padding: 6.5px 10px;
  font-size: 12px;
  font-family: 'Paperlogy', sans-serif;
  color: #fff;
  background-color: #dc3545; /* 빨간색 배경 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; /* 파일 선택 버튼과의 간격 */
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333; /* 호버 시 더 어두운 빨간색 */
  }
`;
