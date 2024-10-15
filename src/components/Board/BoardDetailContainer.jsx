import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip'; // Tooltip 임포트
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 임포트
import {
  DetailWrapper,
  BottomButtonContainer,
  HeartStyled,
} from '../../styles/board/boardDetailContainer';
import TabContainer from './TabContainer';
import Button from '../Button';
import axios from 'axios';

const BoardDetailContainer = () => {
  const { boardId } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [boardData, setBoardData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // 게시물 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get('/sampleData.json');
        const data = response.data;

        const boardItem = data.dtoList.find(
          item => item.boardId === parseInt(boardId, 10)
        );

        if (boardItem) {
          setBoardData(boardItem);
          setIsLiked(false);
        } else {
          console.log(`게시글 ID ${boardId}에 해당하는 데이터가 없습니다.`);
        }
      } catch (error) {
        console.error('게시글 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    if (boardId) {
      fetchBoardData();
    } else {
      console.log('boardId가 undefined입니다.');
    }
  }, [boardId]);

  // 좋아요 핸들러
  const handleLike = () => {
    setIsLiked(prevState => {
      const newLikedState = !prevState;
      setBoardData(prevData => ({
        ...prevData,
        likeCount: newLikedState
          ? prevData.likeCount + 1
          : prevData.likeCount - 1,
      }));
      return newLikedState;
    });
  };

  // 마이페이지로 이동하는 핸들러
  const handleNavigateToMyPage = () => {
    navigate('/auth/mypage'); // 마이페이지로 이동
  };

  return (
    <DetailWrapper>
      <TabContainer boardData={boardData} />
      <BottomButtonContainer>
        <Button
          size="lg"
          color="blue"
          data-tooltip-id="my-tooltip-click" // 툴팁 ID 설정
        >
          마이페이지에 저장
        </Button>
        <Tooltip
          id="my-tooltip-click"
          border="1px solid black"
          content={
            <>
              <p>
                마이페이지에 저장되었습니다!
                <br />
              </p>
              <button
                onClick={handleNavigateToMyPage}
                style={{
                  backgroundColor: 'white', // 배경색
                  color: 'black', // 글자색
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                마이페이지로 이동
              </button>
            </>
          }
          events={['click']}
          clickable
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HeartStyled
            width={24}
            height={24}
            active={isLiked}
            onClick={handleLike}
          />
          <span style={{ fontSize: '18px' }}>
            {boardData ? boardData.likeCount : 0}
          </span>
        </div>
      </BottomButtonContainer>
    </DetailWrapper>
  );
};

export default BoardDetailContainer;
