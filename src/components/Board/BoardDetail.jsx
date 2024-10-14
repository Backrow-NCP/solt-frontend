import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  InfoTextTitleContainer,
  BoardDetailContainer,
  DateAuthorContainer,
  Title,
  Content,
  InfoText,
  Image,
  ButtonContainer,
  Button,
  Thumbnail,
  ThumbnailContainer,
} from '../../styles/board/boardDetail'; // styled-components를 가져옵니다.

import PrevButton from '../../assets/images/prevButton.svg';
import NextButton from '../../assets/images/nextButton.svg';

const BoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`/sampleData.json`);

        const boardData = response.data.dtoList.find(
          item => item.boardId === parseInt(boardId)
        );
        setBoard(boardData);
      } catch (error) {
        console.error('게시물 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchBoardData();
  }, [boardId]);

  const handleNextImage = () => {
    if (board && currentImageIndex < board.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleButtonClick = direction => {
    if (direction === 'prev') {
      handlePrevImage();
    } else if (direction === 'next') {
      handleNextImage();
    }
  };

  const handleThumbnailClick = index => {
    setCurrentImageIndex(index); // 클릭된 썸네일의 인덱스로 이미지 변경
  };

  if (!board) {
    return <h3>게시물 정보를 불러오는 중입니다...</h3>;
  }

  return (
    <BoardDetailContainer>
      <InfoTextTitleContainer>
        <InfoText>
          [{board.location}] [{board.duration}]
        </InfoText>
        <Title>{board.title}</Title>
      </InfoTextTitleContainer>
      <DateAuthorContainer>
        {new Date(board.regDate).toLocaleString()} / {board.member.name} 님
      </DateAuthorContainer>

      <ButtonContainer>
        <Button onClick={() => handleButtonClick('prev')}>
          <img src={PrevButton} alt="이전 이미지" />
        </Button>
        <Image
          src={
            board.images[currentImageIndex]?.fileName ||
            '/sampleImage/nonImage.jpg'
          }
          alt="게시물 이미지"
        />
        <Button onClick={() => handleButtonClick('next')}>
          <img src={NextButton} alt="다음 이미지" />
        </Button>
      </ButtonContainer>

      <ThumbnailContainer>
        {board.images.map((image, index) => (
          <Thumbnail
            key={image.fileName} // 각 썸네일의 고유한 key 설정
            src={image.fileName}
            alt={`썸네일 ${index + 1}`}
            className={currentImageIndex === index ? 'active' : ''} // 선택된 썸네일에 클래스 추가
            onClick={() => handleThumbnailClick(index)} // 썸네일 클릭 시 이미지 변경
          />
        ))}
      </ThumbnailContainer>

      <Content>{board.content}</Content>
    </BoardDetailContainer>
  );
};

export default BoardDetail;
