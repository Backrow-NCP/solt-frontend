import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  DetailWrapper,
  BottomButtonContainer,
  HeartStyled, // Heart 컴포넌트를 스타일로 사용
} from '../../styles/board/boardDetailContainer';
import TabContainer from './TabContainer';
import Button from '../Button';
import axios from 'axios';

const BoardDetailContainer = () => {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // 게시물 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get('/sampleData.json'); // GET 요청으로 데이터 가져오기
        const data = response.data;

        const boardItem = data.dtoList.find(
          item => item.boardId === parseInt(boardId, 10)
        );

        if (boardItem) {
          setBoardData(boardItem); // 게시글 데이터를 상태에 저장
          setIsLiked(false); // 기본적으로 좋아요 상태를 선택 안된 상태로 설정
        } else {
          console.log(`게시글 ID ${boardId}에 해당하는 데이터가 없습니다.`);
        }
      } catch (error) {
        console.error('게시글 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    if (boardId) {
      fetchBoardData(); // boardId가 존재할 경우에만 fetch 요청을 실행
    } else {
      console.log('boardId가 undefined입니다.');
    }
  }, [boardId]);

  const handleSaveToMyPage = () => {
    console.log('마이페이지에 저장됨');
  };

  // 좋아요 핸들러
  const handleLike = () => {
    setIsLiked(prevState => {
      const newLikedState = !prevState; // 현재 상태를 반전
      setBoardData(prevData => ({
        ...prevData,
        likeCount: newLikedState
          ? prevData.likeCount + 1
          : prevData.likeCount - 1, // 상태에 따라 좋아요 수 증가 또는 감소
      }));
      return newLikedState; // 새로운 상태 반환
    });
  };

  return (
    <DetailWrapper>
      <TabContainer boardData={boardData} />
      <BottomButtonContainer>
        <Button size="lg" color="blue" onClick={handleSaveToMyPage}>
          마이페이지에 저장
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HeartStyled
            width={24} // 너비 설정
            height={24} // 높이 설정
            active={isLiked} // 현재 좋아요 상태
            onClick={handleLike} // 클릭 시 좋아요 핸들러
          />
          <span style={{ fontSize: '18px' }}>
            {boardData ? boardData.likeCount : 0} {/* 좋아요 숫자 표시 */}
          </span>
        </div>
      </BottomButtonContainer>
    </DetailWrapper>
  );
};

export default BoardDetailContainer;
