import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarWrapper = styled.nav`
  width: 200px;
  background-color: #fff;
  position: relative;
  margin-top: 60px;
  bottom: 0;
  z-index: 1;
`;

const SidebarHeader = styled.h2`
  margin-bottom: 20px;

  &:hover {
    color: #14b8ff;
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarListItem = styled.li`
  margin-bottom: 20px;
`;

const SidebarLink = styled(Link)`
  &:hover {
    color: #14b8ff;
  }
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Link to="/auth/mypage">
        <SidebarHeader className="size_lg weight_sb">마이페이지</SidebarHeader>
      </Link>
      <SidebarList>
        <SidebarListItem>
          <SidebarLink to="/auth/myplan" className="size_sm">
            나의 플랜
          </SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink to="/auth/myboard" className="size_sm">
            나의 게시글
          </SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink to="/auth/mytest" className="size_sm">
            나의 유형 검사
          </SidebarLink>
        </SidebarListItem>
      </SidebarList>
    </SidebarWrapper>
  );
};

export default Sidebar;
