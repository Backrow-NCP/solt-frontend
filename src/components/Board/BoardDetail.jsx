import React, { useState } from 'react';
import {
  InfoTextTitleContainer,
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

import { scrollbar } from '../../styles/scrollbar';
import styled from 'styled-components'; // styled-components를 가져옵니다.

const BoardDetail = ({ boardData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태

  const handleNextImage = () => {
    if (boardData) {
      setCurrentImageIndex(
        prevIndex => (prevIndex + 1) % boardData.images.length // 마지막 이미지에서 첫 이미지로 순환
      );
    }
  };

  const handlePrevImage = () => {
    if (boardData) {
      setCurrentImageIndex(
        prevIndex =>
          (prevIndex - 1 + boardData.images.length) % boardData.images.length // 첫 이미지에서 마지막 이미지로 순환
      );
    }
  };

  const handleThumbnailClick = index => {
    setCurrentImageIndex(index); // 클릭된 썸네일의 인덱스로 이미지 변경
  };

  // boardData가 없으면 아무것도 렌더링하지 않음
  if (!boardData) {
    return null;
  }

  return (
    <BoardContainer>
      <InfoTextTitleContainer>
        <InfoText>
          [{boardData.location}] [{boardData.duration}]
        </InfoText>
        <Title>{boardData.title}</Title>
      </InfoTextTitleContainer>
      <DateAuthorContainer>
        {new Date(boardData.regDate).toLocaleString()} / {boardData.member.name}{' '}
        님
      </DateAuthorContainer>

      <ButtonContainer>
        <Button onClick={handlePrevImage}>
          <img src={PrevButton} alt="이전 이미지" />
        </Button>
        <Image
          src={
            boardData.images[currentImageIndex]?.fileName ||
            '/sampleImage/nonImage.jpg'
          }
          alt="게시물 이미지"
        />
        <Button onClick={handleNextImage}>
          <img src={NextButton} alt="다음 이미지" />
        </Button>
      </ButtonContainer>

      <ThumbnailContainer>
        {boardData.images.map((image, index) => (
          <Thumbnail
            key={image.fileName} // 각 썸네일의 고유한 key 설정
            src={image.fileName}
            alt={`썸네일 ${index + 1}`}
            className={currentImageIndex === index ? 'active' : ''} // 선택된 썸네일에 클래스 추가
            onClick={() => handleThumbnailClick(index)} // 썸네일 클릭 시 이미지 변경
          />
        ))}
      </ThumbnailContainer>

      <Content>{boardData.content}</Content>
    </BoardContainer>
  );
};

export default BoardDetail;

const BoardContainer = styled.div`
  height: 48vh;
  overflow-y: auto;
  ${scrollbar}

  display: flex;
  flex-direction: column;
  gap: 0px; // 각 요소 간의 간격 설정

  > * {
    padding-right: 10px; // 오른쪽 여백 설정
  }
`;
