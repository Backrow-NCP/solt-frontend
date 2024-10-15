import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TabsContainer,
  Tab,
  ContentContainer,
  CombinedContainer,
} from '../../styles/board/tabContainer';
import BoardDetail from './BoardDetail';

const TabContainer = ({ boardData }) => {
  const [activeTab, setActiveTab] = useState('게시글'); // 기본 활성 탭 설정

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
          <div>여행일정 관련 내용을 여기에 추가하세요.</div>
        ) : (
          <BoardDetail boardData={boardData} /> // 게시글 탭일 때 BoardDetail 컴포넌트 표시
        )}
      </ContentContainer>
    </CombinedContainer>
  );
};

export default TabContainer;
