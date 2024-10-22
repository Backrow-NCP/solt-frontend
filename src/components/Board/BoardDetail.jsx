import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import { getMemberId } from '../../utils/token/tokenUtils';
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

import ReplySection from './ReplySection'; // ReplySection을 가져옵니다.
import defaultImage from '../../assets/images/sample/nonImage.jpg';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';

const BoardDetail = ({ boardData }) => {
  console.log('나 겟멤버 함수', getMemberId());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // navigate 변수를 정의합니다.
  useEffect(() => {
    setupInterceptors(setLoading);

    const handleKeyDown = event => {
      if (event.key === 'ArrowRight') {
        handleNextImage();
      } else if (event.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex, boardData]);

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

  console.log('');
  const handleEdit = async () => {
    try {
      navigate(`/board/edit/${boardData.boardId}`, {
        state: {
          content: boardData.content,
          title: boardData.title,
          fileName: boardData.fileName,
          plan: boardData.plan,
          memberId: boardData.member.memberId,
        },
      }); // navigate 호출 종료
    } catch (error) {
      console.error('Error fetching edit data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(
        `board/delete/${boardData.boardId}`
      );
      console.log('Delete Response:', response.data);
    } catch (error) {
      console.error('Error deleting the post:', error);
    }
  };

  const thumbnailize = '?type=f&w=50&h=50'; // 썸네일 크기 설정
  const imageUrl =
    boardData.images?.length > 0
      ? `${process.env.REACT_APP_IMAGE_STORAGE_URL}${boardData.images[currentImageIndex].fileName}`
      : defaultImage; // 기본 이미지 설정

  if (!boardData) {
    return console.log('!boardData일때, 보드디테일', boardData);
  }
  console.log('보드데이터 체크용, 보드디테일', boardData);

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
  const currentMemberId = getMemberId();
  return (
    <>
      <BoardContainer>
        <InfoTextTitleContainer>
          <InfoText>
            [{boardData.plan.location}] [
            {calculateDuration(
              boardData.plan.startDate,
              boardData.plan.endDate
            )}
            ]
          </InfoText>
          <Title>{boardData.title}</Title>
        </InfoTextTitleContainer>
        <DateAuthorContainer>
          {new Date(boardData.regDate).toLocaleDateString()}
          {new Date(boardData.regDate).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          / {boardData.member.name} 님
        </DateAuthorContainer>

        <ButtonContainer>
          <Button onClick={handlePrevImage}>
            <img src={PrevButton} alt="이전 이미지" />
          </Button>
          <Image src={imageUrl} alt="게시물 이미지" />
          <Button onClick={handleNextImage}>
            <img src={NextButton} alt="다음 이미지" />
          </Button>
        </ButtonContainer>

        <ThumbnailContainer>
          {boardData.images.map((image, index) => (
            <Thumbnail
              key={image.fileName}
              src={`${process.env.REACT_APP_IMAGE_STORAGE_URL}${image.fileName}${thumbnailize}`} // 썸네일 URL 생성
              alt={`썸네일 ${index + 1}`}
              className={currentImageIndex === index ? 'active' : ''}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </ThumbnailContainer>

        <Content>{boardData.content}</Content>

        {currentMemberId === boardData.member.memberId && (
          <ButtonContainerStyled>
            <EditButton onClick={handleEdit}>수정</EditButton>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </ButtonContainerStyled>
        )}
        {/* ReplySection 컴포넌트 삽입 */}
        <ReplySection boardId={boardData.boardId} />
      </BoardContainer>
    </>
  );
};

export default BoardDetail;
