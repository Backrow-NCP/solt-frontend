import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  TabsContainer,
  Tab,
  ContentContainer,
  CombinedContainer,
} from '../../styles/board/tabContainer';
import BoardDetail from './BoardDetail';
import PlaceList from '../Plan/PlaceList';
import DayTab from '../Plan/DayTabs';

const TabContainer = ({
  filteredPlaces,
  places,
  planTime,
  findRoute,
  editPrice,
  toggleEditPrice,
  toggleModifyPlace,
  handleModifyClick,
  displayButtons,
  boardData,
  setEditPlace,
}) => {
  const [activeTab, setActiveTab] = useState('게시글'); // 기본 활성 탭 설정
  const [selectedDay, setSelectedDay] = useState(1); // 날짜 선택
  const [localEditPlace, setLocalEditPlace] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // 유일한 날짜 배열 생성
  const days = useMemo(
    () =>
      places && places.length > 0
        ? Array.from(
            new Set(
              places.map(
                place => new Date(place.startTime).toISOString().split('T')[0]
              )
            )
          ).sort((a, b) => new Date(a) - new Date(b))
        : [],
    [places]
  );

  // 날짜 클릭 시 일정 수정 상태 초기화
  const handleTabClick = useCallback(
    index => {
      console.log(`Day clicked: ${index + 1}`);
      setSelectedDay(index + 1);
      setLocalEditPlace({});
      setIsEditing(false);
    },
    [setSelectedDay, setLocalEditPlace, setIsEditing]
  );

  // 탭(여행일정, 게시글) 클릭 시 활성화
  const handleTabChange = useCallback(
    tabName => {
      console.log(`Tab changed: ${tabName}`);
      setActiveTab(tabName);
      setLocalEditPlace({});
      setIsEditing(false);
    },
    [setActiveTab, setLocalEditPlace, setIsEditing]
  );

  useEffect(() => {
    console.log('Active Tab:', activeTab);
    console.log('Filtered Places 탭 컨테이너:', filteredPlaces);
    console.log('places 탭 컨테이너', places);

    if (!filteredPlaces || filteredPlaces.length === 0) {
      console.log('filteredPlaces가 비어 있습니다.');
    }

    if (filteredPlaces && filteredPlaces.length > 0) {
      filteredPlaces.forEach(newPlace => {
        setLocalEditPlace(prevState => ({
          ...prevState,
          [newPlace.placeId]: true,
        }));
      });
    }
  }, [activeTab, filteredPlaces]);

  // 선택된 날짜에 해당하는 장소 필터링
  const placesOnSelectedDay = places.filter(
    place =>
      new Date(place.startTime).toISOString().split('T')[0] ===
      days[selectedDay - 1]
  );

  return (
    <CombinedContainer>
      <TabsContainer setEditPlace={setEditPlace}>
        <Tab
          $isActive={activeTab === '여행일정'}
          onClick={() => handleTabChange('여행일정')}
        >
          <b>여행일정</b>
        </Tab>
        <Tab
          $isActive={activeTab === '게시글'}
          onClick={() => handleTabChange('게시글')}
        >
          <b>게시글</b>
        </Tab>
      </TabsContainer>

      {activeTab === '여행일정' && (
        <DayTab
          days={days}
          selectedDay={selectedDay}
          onTabClick={handleTabClick}
        />
      )}

      <ContentContainer>
        {activeTab === '여행일정' ? (
          <div>
            <PlaceList
              filteredPlaces={placesOnSelectedDay}
              planTime={planTime}
              findRoute={findRoute}
              editPrice={editPrice}
              isEditing={isEditing}
              toggleEditPrice={toggleEditPrice}
              editPlace={false}
              toggleModifyPlace={toggleModifyPlace}
              handleModifyClick={handleModifyClick}
              displayButtons={false}
            />
          </div>
        ) : (
          <div>
            <BoardDetail boardData={boardData} />
          </div>
        )}
      </ContentContainer>
    </CombinedContainer>
  );
};

export default TabContainer;
