import React from 'react';
import {
  BoardBox,
  Thumbnail,
  TextContainer,
} from '../../styles/board/boardItem';
import defaultImage from '../../assets/images/sample/defaultImage.jpg'; // 기본 이미지 임포트

const BoardItem = ({
  title,
  content,
  imageUrl,
  location,
  date,
  author,
  duration,
}) => {
  return (
    <BoardBox>
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
          <h3>{title}</h3>
          {content}
        </div>
      </TextContainer>
    </BoardBox>
  );
};

export default BoardItem;
