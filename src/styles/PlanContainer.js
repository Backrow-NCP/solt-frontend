// src/styles/PlanContainerStyles.js
import styled from 'styled-components';

export const PlanCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  height: 150px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
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
`;

export const PlanActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 33.3%;
  z-index: 1;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
`;
