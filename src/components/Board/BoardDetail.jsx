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
  ButtonContainerStyled,
  EditButton,
  DeleteButton,
  BoardContainer,
} from '../../styles/board/boardDetail'; // styled-components를 가져옵니다.

import PrevButton from '../../assets/images/prevButton.svg';
import NextButton from '../../assets/images/nextButton.svg';
import axios from 'axios'; // axios를 가져옵니다.
import ReplySection from './ReplySection'; // ReplySection을 가져옵니다.

const BoardDetail = ({ boardData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (boardData) {
      setCurrentImageIndex(
        prevIndex => (prevIndex + 1) % boardData.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (boardData) {
      setCurrentImageIndex(
        prevIndex =>
          (prevIndex - 1 + boardData.images.length) % boardData.images.length
      );
    }
  };

  const handleThumbnailClick = index => {
    setCurrentImageIndex(index);
  };

  const handleEdit = async () => {
    try {
      const response = await axios.get(`board/edit/${boardData.boardId}`);
      console.log('Edit Response:', response.data);
    } catch (error) {
      console.error('Error fetching edit data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`board/delete/${boardData.boardId}`);
      console.log('Delete Response:', response.data);
    } catch (error) {
      console.error('Error deleting the post:', error);
    }
  };

  if (!boardData) {
    return console.log('!boardData일때, 보드디테일', boardData);
  }
  console.log('보드데이터 체크용, 보드디테일', boardData);

  return (
    <>
      <BoardContainer>
        <InfoTextTitleContainer>
          <InfoText>
            [{boardData.location}] [{boardData.duration}]
          </InfoText>
          <Title>{boardData.title}</Title>
        </InfoTextTitleContainer>
        <DateAuthorContainer>
          {new Date(boardData.regDate).toLocaleString()} /{' '}
          {boardData.member.name} 님
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
              key={image.fileName}
              src={image.fileName}
              alt={`썸네일 ${index + 1}`}
              className={currentImageIndex === index ? 'active' : ''}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </ThumbnailContainer>

        <Content>{boardData.content}</Content>

        <ButtonContainerStyled>
          <EditButton onClick={handleEdit}>수정</EditButton>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        </ButtonContainerStyled>

        {/* ReplySection 컴포넌트 삽입 */}
        <ReplySection boardId={boardData.boardId} />
      </BoardContainer>
    </>
  );
};

export default BoardDetail;
