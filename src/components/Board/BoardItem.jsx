import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅
import axios from 'axios'; // axios 임포트
import {
  BoardBox,
  Thumbnail,
  TextContainer,
} from '../../styles/board/boardItem';
import defaultImage from '../../assets/images/sample/nonImage.jpg';

const BoardItem = ({
  boardId, // boardId 추가
  title,
  content,
  imageUrl,
  location,
  date,
  author,
  duration,
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // boardId를 사용하여 해당 게시물 데이터를 GET 요청으로 가져옴
      const response = await axios.get(`/sampleData.json`);
      const boardData = response.data;

      // 상세 페이지로 이동하면서 가져온 데이터를 state로 전달
      navigate(`/board/detail/${boardId}`, { state: { boardData } });
    } catch (error) {
      console.error('게시물 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  return (
    <BoardBox onClick={handleClick}>
      <Thumbnail src={imageUrl || defaultImage} alt="게시글 이미지" />
      <TextContainer>
        <div className="info">
          <div className="locationDurationContainer">
            <div className="locationBox">
              <span>{location}</span>
            </div>
            <div className="durationBox">
              <span>{duration}</span>
            </div>
          </div>
          <div className="dateAuthorContainer">
            <p>{date}</p>
            <p>작성자: {author}</p>
          </div>
        </div>

        <div className="contentBox">
          <h3 style={{ marginBottom: 5 }}>{title}</h3>
          {content}
        </div>
      </TextContainer>
    </BoardBox>
  );
};

export default BoardItem;
