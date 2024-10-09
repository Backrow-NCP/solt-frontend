import styled, { keyframes } from 'styled-components';

export const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: calc(10vh + 60px);
  width: 350px;
  max-width: 90%;
  height: 500px; /* 기본 높이 */
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  z-index: 1000;
  padding: 20px;
  animation: slide-up 0.3s ease-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 600px) {
    right: 5%;
    bottom: 20px;
    width: 90%;
    height: 500px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding-right: 10px; /* 스크롤바가 있을 때 오른쪽 공간 확보 */
`;

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ChatBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: ${({ isUser }) => (isUser ? '#14B8FF' : '#f1f1f1')};
  color: ${({ isUser }) => (isUser ? '#fff' : '#333')};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  font-size: 14px;
  line-height: 1.4;
  animation: ${fadeIn} 0.4s ease-in-out;

  @media (max-width: 600px) {
    max-width: 90%;
    font-size: 13px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f1f1f1;
  border-radius: 35px;
  padding: 5px;
  border: 1px solid #ddd;

  input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 35px;
    background: transparent;
    margin-right: 10px;
    outline: none;
    font-size: 14px;
  }
`;

export const SendButton = styled.button`
  color: white;
  border: none;
  border-radius: 35px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #888;
  }
`;
