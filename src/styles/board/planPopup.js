// PlanPopupStyles.js
import styled from 'styled-components';

export const PopupContainer = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  width: 800px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  /* 스크롤 추가 */
  max-height: 400px; /* 원하는 최대 높이로 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 세로 스크롤 추가 */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;
