import styled from 'styled-components';

export const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: calc(10vh + 60px);
  width: 350px;
  max-width: 90%;
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  z-index: 1000;
  padding: 20px;
  animation: slide-up 0.3s ease-out;
  overflow-y: auto;
  max-height: 400px;

  @media (max-width: 600px) {
    right: 5%;
    bottom: 20px;
    width: 90%;
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

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  background: #f1f1f1;
  border-radius: 35px;
  padding: 5px;
  border: 1px solid #ddd;

  input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 35px;
    //font-size: 14px;
    background: transparent;
    margin-right: 10px;
    outline: none;
  }
`;

export const SendButton = styled.button`
  color: white;
  border: none;
  border-radius: 35px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px; /* 원하는 이미지 너비로 조정 */
    height: 20px; /* 원하는 이미지 높이로 조정 */
  }

  &:hover {
    background-color: #888;
  }
`;
