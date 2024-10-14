import React, { useState } from 'react';
import styled from 'styled-components';
import BoardDetail from './BoardDetail';

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  background-color: ${props => (props.isActive ? '#e0e0e0' : '#f0f0f0')};
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState('게시글'); // 기본 활성 탭 설정

  return (
    <div>
      <TabsContainer>
        <Tab
          isActive={activeTab === '여행일정'}
          onClick={() => setActiveTab('여행일정')}
        >
          여행일정
        </Tab>
        <Tab
          isActive={activeTab === '게시글'}
          onClick={() => setActiveTab('게시글')}
        >
          게시글
        </Tab>
      </TabsContainer>

      <ContentContainer>
        {activeTab === '여행일정' ? (
          <div>여행일정 관련 내용을 여기에 추가하세요.</div>
        ) : (
          <BoardDetail /> // 게시글 탭일 때 BoardDetail 컴포넌트 표시
        )}
      </ContentContainer>
    </div>
  );
};

export default TabContainer;
