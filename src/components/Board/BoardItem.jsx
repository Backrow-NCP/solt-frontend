import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅
import axios from 'axios'; // axios 임포트
import {
  BoardBox,
  Thumbnail,
  TextContainer,
} from '../../styles/board/boardItem';
import defaultImage from '../../assets/images/sample/nonImage.jpg';

const BoardItem = ({ board }) => {
  const navigate = useNavigate();

  // 현재 페이지 및 페이지 크기 상태 관리
  const [page, setPage] = useState(0);
  const [size] = useState(5); // 고정된 페이지 크기

  const handleClick = async () => {
    try {
      navigate(`/board/detail/${board.boardId}`);
      setPage(prevPage => prevPage + 1); // 예시로 다음 페이지로 이동
    } catch (error) {
      console.error('게시물 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  // board에서 필요한 데이터 추출
  const {
    boardId,
    title,
    content,
    images,
    location,
    regDate,
    member,
    duration,
  } = board;

  // .env 파일에서 관리하는 이미지 저장소 URL을 사용하여 이미지 URL 생성
  const imageUrl =
    images.length > 0
      ? `${process.env.REACT_APP_IMAGE_STORAGE_URL}${images[0].fileName}`
      : defaultImage; // 기본 이미지 설정
  console.log('이미지 url 테스트', imageUrl);

  const date = new Date(regDate).toLocaleDateString(); // 날짜 포맷

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    // 두 날짜 차이 계산
    const diffInMilliseconds = end - start;
    const diffInDays = Math.round(diffInMilliseconds / dayInMilliseconds);

    if (diffInDays === 0) {
      return '당일치기';
    }

    const nights = diffInDays; // 숙박 일수
    const days = nights + 1; // 총 일수

    return `${nights}박 ${days}일`;
  };

  return (
    <BoardBox onClick={handleClick}>
      <Thumbnail src={imageUrl} alt="게시글 이미지" />
      <TextContainer>
        <div className="info">
          <div className="locationDurationContainer">
            <div className="locationBox">
              <span>{board.plan.location}</span>
            </div>
            <div className="durationBox">
              <span>
                {calculateDuration(board.plan.startDate, board.plan.endDate)}
              </span>
            </div>
          </div>
          <div className="dateAuthorContainer">
            <p>{date}</p>
            <p>작성자: {member.name}</p> {/* 작성자 이름 */}
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
