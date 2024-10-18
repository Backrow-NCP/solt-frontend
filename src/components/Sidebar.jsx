import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from '../styles/global'; // 글로벌 스타일 임포트

const SidebarWrapper = styled.nav`
  width: 200px;
    background-color: #fff;
    position: relative;
    margin-top: 60px;
    bottom: 0;
    z-index: 1;

  h2 {
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 20px;

      a {
        color: #000; /* 기본 텍스트 색상 */
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #14B8FF; /* 호버 시 파란색 */
        }
      }
    }
  }

  /* 반응형 설정 */
  @media (max-width: 1650px) {
    margin-left: 2%;
    width: 15%;
    max-width: 200px;

    &.show {
      width: 15%;
    }
  }

  @media (max-width: 1215px) {
    margin-left: 2%;
    width: 14%;
    max-width: 180px;

    &.show {
      width: 14%;
    }
  }

  @media (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    text-align: center;
    padding: 20px 0;

    &.show {
      width: 100%;
    }

    ul {
      display: flex;
      justify-content: center;
      gap: 15px;

      li {
        margin-bottom: 10px;
      }
    }

    h2 {
      text-align: center;
    }
  }

  @media (max-width: 780px) {
    width: 100%;
    max-width: 100%;

    &.show {
      width: 100%;
    }
  }
`;

const Sidebar = ({ isSidebarVisible }) => {
  return (
    <>
      <GlobalStyle /> {/* 글로벌 스타일 적용 */}
      <SidebarWrapper className={isSidebarVisible ? 'show' : ''}>
        <h2>마이페이지</h2> {/* h2 스타일을 글로벌 스타일로 확장 가능 */}
        <ul>
          <li>
            <Link to="/auth/myplan">나의 플랜</Link>
          </li>
          <li>
            <Link to="/auth/myboard">나의 게시글</Link>
          </li>
        </ul>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
