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
import { getMemberId } from '../../utils/token/tokenUtils';

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

  const [loading, setLoading] = useState(false);
  const memberId = getMemberId();
  // console.log('planData 확인용 BDC', places); => null 값 나옴
  const [likeCount, setLikeCount] = useState(boardData.likeCount); // 좋아요 카운트
  const [editPrice, setEditPrice] = useState(0); // 가격 상태 추가
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 날짜 상태 추가
  const placesData = planData?.places;
  const [editPlace, setEditPlace] = useState({}); // 추가
  const [showTooltip, setShowTooltip] = useState(false);
  const [active, setActive] = useState(false);

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

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const statusResponse = await apiClient.get('/like/status', {
          params: {
            boardId: boardId,
            memberId: memberId,
          },
        });

        if (statusResponse.status === 200) {
          console.log('좋아요 상태:', statusResponse.data);
          setActive(statusResponse.data); // 초기 좋아요 상태 설정
        }
      } catch (error) {
        console.error('좋아요 상태 요청 실패:', error);
      }
    };

    fetchLikeStatus(); // 컴포넌트 마운트 시 상태 요청
  }, [boardId, memberId]);

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

  useEffect(() => {
    setLikeCount(boardData.likeCount); // 서버에서 받아온 좋아요 상태 초기화
  }, [boardData]);

  const handleLike = async () => {
    try {
      // 좋아요 요청

      const response = await apiClient.post('/like', {
        boardId: boardId,
        memberId: memberId,
      });

      if (response.status === 200) {
        setLikeCount(response.data.likeCount); // 좋아요 갯수 업데이트
        console.log('setLikeCount 증가', response.data.likeCount);

        // 좋아요 상태 요청
        const statusResponse = await apiClient.get('/like/status', {
          params: {
            boardId: boardId,
            memberId: memberId,
          },
        });

        if (statusResponse.status === 200) {
          // 상태 응답 처리
          console.log('좋아요 상태:', statusResponse.data);
          setActive(statusResponse.data); // 상태 업데이트
        }
      }
    } catch (error) {
      console.error('좋아요 요청 실패:', error);
    }
  };

  console.log('보드데이터 테스트중 BDC', boardData);

  console.log('좋아요 상태');
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
            onClick={() => {
              handleLike(); // 좋아요 처리
              setActive(prevActive => !prevActive); // active 상태 토글
            }}
            active={active}
          />

          <span style={{ fontSize: '18px' }}>{likeCount}</span>
        </div>
      </BottomButtonContainer>
    </DetailWrapper>
  );
};

export default BoardDetailContainer;
