import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TabsContainer,
  Tab,
  ContentContainer,
  CombinedContainer,
} from '../../styles/board/tabContainer';
import BoardDetail from './BoardDetail';
import PlaceList from '../Plan/PlaceList';
import DayTab from '../Plan/DayTabs';
import Map from '../Plan/Map';

const TabContainer = ({
  places,
  planTime,
  findRoute,
  editPrice,
  toggleEditPrice,
  toggleModifyPlace,
  handleModifyClick,
  boardData,
  setEditPlace,
  isDetailPage,
  filteredPlaces,
  setFilteredPlaces,
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

  // 날짜 클릭 시 선택된 날짜의 장소 필터링 및 filteredPlaces 업데이트
  const handleTabClick = useCallback(
    index => {
      console.log(`Day clicked: ${index + 1}`);
      setSelectedDay(index + 1);

      // 선택된 날짜에 해당하는 장소 필터링
      const filtered = places.filter(
        place =>
          new Date(place.startTime).toISOString().split('T')[0] === days[index]
      );

      setFilteredPlaces(filtered); // 필터링된 장소 업데이트
      setLocalEditPlace({});
      setIsEditing(false);
    },
    [places, days, setFilteredPlaces]
  );

  // 컴포넌트가 마운트될 때 "여행일정" 탭을 클릭
  useEffect(() => {
    handleTabChange('여행일정');
    handleTabClick(0); // 첫 번째 날짜 클릭
  }, []); // 의존성 배열이 비어있으므로 한 번만 실행됨

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

  // 새로운 장소 설정
  let newStartTime;
  if (filteredPlaces.length > 0) {
    const lastPlace = filteredPlaces[filteredPlaces.length - 1];
    const lastEndTime = new Date(lastPlace.endTime);
    lastEndTime.setHours(lastEndTime.getHours() + 1);
    newStartTime = lastEndTime.toISOString();
  } else {
    const selectedDate = new Date(days[selectedDay - 1]);
    selectedDate.setHours(9, 0, 0, 0);
    newStartTime = selectedDate.toISOString();
  }

  const newPlace = {
    placeId: Date.now(),
    placeName: '새로운 장소',
    description: '',
    price: 0,
    addr: '',
    category: '',
    startTime: newStartTime,
    endTime: newStartTime,
    checker: false,
    isNew: true,
  };

  return (
    <CombinedContainer>
      <TabsContainer setEditPlace={setEditPlace}>
        <Tab
          $isActive={activeTab === '여행일정'}
          onClick={() => {
            handleTabChange('여행일정');
            handleTabClick(0);
          }}
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
          isDetailPage={isDetailPage}
        />
      )}

      <ContentContainer>
        {activeTab === '여행일정' ? (
          <div>
            <PlaceList
              filteredPlaces={filteredPlaces}
              planTime={planTime}
              findRoute={findRoute}
              editPrice={editPrice}
              isEditing={isEditing}
              toggleEditPrice={toggleEditPrice}
              editPlace={false}
              toggleModifyPlace={toggleModifyPlace}
              handleModifyClick={handleModifyClick}
              displayButtons={false}
              isDetailPage={isDetailPage}
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
