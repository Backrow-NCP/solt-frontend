import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarWrapper = styled.nav`
  width: 15%; /* 퍼센트로 설정 */
  max-width: 200px;
  background-color: #fff;
  position: relative;
  margin-top: 60px;
  bottom: 0;
  z-index: 1;
  opacity: 0; /* 초기값: 투명 */
  visibility: hidden; /* 초기값: 숨김 */
  transform: translateX(-20px); /* 슬라이드 효과 추가 */
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out, transform 0.7s ease-in-out; /* 트랜지션 */

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(0); /* 원래 위치로 슬라이드 */
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 20px;

      a {
        color: #000; /* 기본 텍스트 색상 */
        text-decoration: none; /* 링크 밑줄 제거 */
        transition: color 0.3s ease; /* 색상 변경 시 트랜지션 */

        &:hover {
          color: #14B8FF; /* 호버 시 텍스트 색상을 파란색으로 변경 */
        }
      }
    }
  }


  @media (max-width: 1650px) {
    margin-left: 2%; /* 1650px 이하에서 여백 설정 */
    width: 15%; /* 15% 너비 */
    max-width: 200px;
    
    &.show {
      width: 15%;
    }
  }

  @media (max-width: 1215px) {
    margin-left: 2%; /* 좁은 여백 */
    width: 14%; /* 조금 더 좁은 비율 */
    max-width: 180px;

    &.show {
      width: 14%;
    }
  }

  @media (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
    width: 100%; /* 전체 너비 사용 */
    text-align: center;
    position: relative;
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
    width: 100%; /* 작은 화면에서 전체 너비 */
    max-width: 100%;

    &.show {
      width: 100%;
    }
  }
`;

const Sidebar = () => {
    return (
      <SidebarWrapper>
        <h2 className="size_lg weight_sb">마이페이지</h2>
        <ul>
          <li>
            <a href="/auth/myplan" className="size_sm">나의 플랜</a>
          </li>
          <li>
            <a href="/auth/myboard" className="size_sm">나의 게시글</a>
          </li>
        </ul>
      </SidebarWrapper>
    );
  };

export default Sidebar;
