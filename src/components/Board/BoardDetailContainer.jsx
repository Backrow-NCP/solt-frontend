import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Tooltip } from 'react-tooltip'; // Tooltip 임포트
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 임포트
import {
  DetailWrapper,
  BottomButtonContainer,
  HeartStyled,
} from '../../styles/board/boardDetailContainer';
import TabContainer from './TabContainer';
import Button from '../Button';
import PlanInfo from '../Plan/PlanInfo';
import planTime from '../../utils/plan/planTime';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';

const BoardDetailContainer = ({
  planData,
  filteredPlaces,
  setFilteredPlaces,
  data,
  places,
  totalPrice,
  pieChartData,
  isDetailPage,
  boardData,
  days,
}) => {
  const { boardId } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log('planData 확인용 BDC', places); => null 값 나옴

  const [editPrice, setEditPrice] = useState(0); // 가격 상태 추가
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 날짜 상태 추가
  const placesData = planData?.places;
  const [editPlace, setEditPlace] = useState({}); // 추가
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setupInterceptors(setLoading);
  }, []);

  // 게시물 데이터를 가져오는 useEffect
  useEffect(() => {
    if (boardId) {
      // fetchBoardData();
    } else {
      console.log('boardId가 undefined입니다.');
    }
  }, [boardId]);

  // 좋아요 핸들러
  const handleLike = () => {
    setIsLiked(prevState => {
      const newLikedState = !prevState;
      // setBoardData(prevData => ({
      //   ...prevData,
      //   likeCount: newLikedState
      //     ? prevData.likeCount + 1
      //     : prevData.likeCount - 1,
      // }));
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

  const toggleModifyPlace = () => {
    // 장소 수정 토글 로직
  };

  const handleModifyClick = placeId => {
    // 장소 수정 클릭 핸들러
  };

  const displayButtons = () => {
    // 버튼 표시 로직
  };
  const handleTabClick = useCallback(index => {
    setSelectedDay(index + 1);
  }, []);

  const handleSaveToMyPage = useCallback(() => {
    const reqData = {
      ...planData,
      places: planData?.places.map(place => {
        place.placeId = null;
        return place;
      }),
      routes: planData?.routes.map(route => {
        route.routeId = null;
        return route;
      }),
      themes: planData?.themes.map(theme => theme.themeId),
    };

    apiClient
      .post('/plans', reqData)
      .then(res => {
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000); // 3초 후 툴팁 숨기기
        } else {
          alert('저장에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('저장에 실패했습니다. 다시 시도해주세요.');
      });
  }, [planData]);

  // // console.log('places BDC', places);
  // console.log('필터링 플레이스 BDC', filteredPlaces);
  // // console.log('days:', days);
  // console.log('plan', planData);
  console.log('보드데이터 테스트중 BDC', boardData);

  return (
    <DetailWrapper>
      <div>
        <PlanInfo
          memberName={planData.member?.name || '여행자'}
          location={planData.location}
          totalPrice={totalPrice}
          pieChartData={pieChartData}
          isDetailPage={true}
        />
        <TabContainer
          places={places && places.length > 0 ? places : []} // 안전하게 처리
          planTime={planTime}
          findRoute={findRoute}
          handlePriceChange={handlePriceChange}
          editPrice={editPrice}
          isEditing={isEditing}
          toggleEditPrice={toggleEditPrice}
          editPlace={editPlace}
          setEditPlace={setEditPlace}
          toggleModifyPlace={toggleModifyPlace}
          handleModifyClick={handleModifyClick}
          displayButtons={displayButtons}
          boardData={boardData}
          handleTabClick={handleTabClick}
          isDetailPage={true}
          filteredPlaces={filteredPlaces}
          setFilteredPlaces={setFilteredPlaces}
        />
      </div>

      <BottomButtonContainer>
        <Button
          size="lg"
          color="blue"
          data-tooltip-id="my-tooltip-click"
          onClick={handleSaveToMyPage}
        >
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
          isOpen={showTooltip}
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
