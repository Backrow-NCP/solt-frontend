import React, { useState, useEffect } from 'react';
import { ChatbotContainer, CloseButton, InputWrapper, SendButton, ChatContainer, ChatBubble } from '../styles/chatbotPopup'; 
import sendIcon from '../assets/images/send.png'; 

const ChatbotPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // 사용자 메시지를 추가
      const newMessages = [...messages, { text: message, isUser: true }];
      setMessages(newMessages);

      // 챗봇 응답 메시지를 추가 (여기서는 간단한 예시로 하드코딩)
      setTimeout(() => {
        const botReply = { text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);

      setMessage(''); // 메시지를 전송한 후 입력란 초기화
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 챗봇 팝업이 열리면 환영 메시지를 추가
      setMessages([{ text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false }]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ChatbotContainer>
      <CloseButton onClick={onClose}>x</CloseButton>
      <h2 className="size_md weight_sb">Chatbot</h2>
      <p className="size_xs">무엇이든 물어보세요.</p>
      <ChatContainer>
        {messages.map((msg, index) => (
          <ChatBubble key={index} isUser={msg.isUser}>
            {msg.text}
          </ChatBubble>
        ))}
      </ChatContainer>
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
