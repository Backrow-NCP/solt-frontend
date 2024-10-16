import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  TabsContainer,
  Tab,
  ContentContainer,
  CombinedContainer,
} from '../../styles/board/tabContainer';
import BoardDetail from './BoardDetail';
import PlaceList from '../Plan/PlaceList';

const TabContainer = ({
  filteredPlaces,
  planTime,
  findRoute,
  handlePriceChange,
  editPrice,
  isEditing,
  toggleEditPrice,
  editPlace,
  toggleModifyPlace,
  handleModifyClick,
  displayButtons,
  boardData,
}) => {
  const [activeTab, setActiveTab] = useState('게시글'); // 기본 활성 탭 설정
  console.log('필터링 플레이스:', filteredPlaces);
  useEffect(() => {
    console.log('Active Tab:', activeTab);
    console.log('Filtered Places:', filteredPlaces);
    // 여기에 filteredPlaces가 비어있을 경우 데이터를 다시 가져오는 로직 추가
  }, [activeTab, filteredPlaces]); // activeTab과 filteredPlaces가 변경될 때마다 실행

  return (
    <CombinedContainer>
      <TabsContainer>
        <Tab
          $isActive={activeTab === '여행일정'}
          onClick={() => setActiveTab('여행일정')}
        >
          <b>여행일정</b>
        </Tab>
        <Tab
          $isActive={activeTab === '게시글'}
          onClick={() => setActiveTab('게시글')}
        >
          <b>게시글</b>
        </Tab>
      </TabsContainer>

      <ContentContainer>
        {activeTab === '여행일정' ? (
          <div>
            여행일정 관련 내용을 여기에 추가하세요.
            <PlaceList
              filteredPlaces={filteredPlaces} // 올바른 데이터 전달
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
            />
          </div>
        ) : (
          <BoardDetail boardData={boardData} /> // 게시글 탭일 때 BoardDetail 컴포넌트 표시
        )}
      </ContentContainer>
    </CombinedContainer>
  );
};

export default TabContainer;
