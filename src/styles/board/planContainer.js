// src/styles/PlanContainerStyles.js
import styled from 'styled-components';

export const PlanCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: flex;
  justify-content: flex-start; /* 혹은 center, space-around */
  width: 100%;
  height: 150px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-bottom: 0px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s ease;
    z-index: 0;
    border-radius: 10px;
  }

  &:hover::before {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const PlanDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.3%;
  text-align: center;
  z-index: 1;
  color: white;
`;

export const PlanName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.3%;
  z-index: 1;
  color: white;
`;

export const PlanActions = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  gap: 10px;
  width: 33.3%; /* 원래의 너비를 유지합니다. */
  z-index: 1;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
`;
