import React, { useState } from 'react';
import { ChatbotContainer, CloseButton, InputWrapper, SendButton } from '../styles/ChatbotPopup'; // 스타일 파일에서 컴포넌트 불러오기
import Button from './Button'; 
import sendIcon from '../assets/images/send.png'; 


const ChatbotPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      console.log('Sent message:', message);
      // 여기에 메시지 전송 로직을 추가할 수 있습니다.
      setMessage(''); // 메시지를 전송한 후 입력란 초기화
    }
  };

  if (!isOpen) return null;

  return (
    <ChatbotContainer>
      <CloseButton onClick={onClose}>x</CloseButton>
      <h2 className="size_md weight_sb">Chatbot</h2>
      <p className="size_xs">무엇이든 물어보세요.</p>
      <InputWrapper>
        <input 
          type="text" 
          value={message} 
          onChange={handleInputChange} 
          placeholder="메시지를 입력하세요..."
          className="size_xs"
        />
        <SendButton onClick={handleSendMessage}>
          <img src={sendIcon} alt="Send" />
        </SendButton>
      </InputWrapper>
    </ChatbotContainer>
  );
};

export default ChatbotPopup;
