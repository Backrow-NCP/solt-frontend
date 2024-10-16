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
import PlanInfo from '../Plan/PlanInfo';

const BoardDetailContainer = ({ planData }) => {
  const { boardId } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [boardData, setBoardData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [planTime, setPlanTime] = useState(null); // 필요한 상태 추가
  const [editPrice, setEditPrice] = useState(0); // 가격 상태 추가
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
  const [filteredPlaces, setFilteredPlaces] = useState([]); // 필터링된 장소 상태 추가

  const placesData = planData.place;

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

  // 필터링된 장소 설정 (예시)
  useEffect(() => {
    if (placesData) {
      const places = placesData.filter(
        place => place.latitude && place.longitude
      );
      setFilteredPlaces(places);
    }
  }, [placesData]);

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

  // 필요한 함수들 추가 (예시)
  const findRoute = () => {
    // 경로 찾기 로직
  };

  const handlePriceChange = newPrice => {
    setEditPrice(newPrice);
  };

  const toggleEditPrice = () => {
    setIsEditing(prev => !prev);
  };

  const editPlace = placeId => {
    // 장소 수정 로직
  };

  const toggleModifyPlace = () => {
    // 장소 수정 토글 로직
  };

  const handleModifyClick = placeId => {
    // 장소 수정 클릭 핸들러
  };

  const displayButtons = () => {
    // 버튼 표시 로직
  };

  return (
    <DetailWrapper>
      <div>
        <PlanInfo {...planData} />
        <TabContainer
          filteredPlaces={filteredPlaces}
          planTime={planTime}
          findRoute={findRoute}
          handlePriceChange={handlePriceChange}
          editPrice={editPrice}
          isEditing={isEditing}
          toggleEditPrice={toggleEditPrice}
          editPlace={editPlace}
          toggleModifyPlace={toggleModifyPlace}
          handleModifyClick={handleModifyClick}
          displayButtons={displayButtons}
          boardData={boardData} // 필요에 따라 추가
        />
      </div>

      <BottomButtonContainer>
        <Button size="lg" color="blue" data-tooltip-id="my-tooltip-click">
          마이페이지에 저장
        </Button>
        <Tooltip
          id="my-tooltip-click"
          style={{ backgroundColor: 'rgb(255,255,255)', color: 'black' }}
          border="1px solid black"
          content={
            <>
              <p style={{ marginBottom: '7px' }}>
                마이페이지에 저장되었습니다!
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={handleNavigateToMyPage}
                  style={{
                    backgroundColor: 'skyblue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  마이페이지로 이동
                </button>
              </div>
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
