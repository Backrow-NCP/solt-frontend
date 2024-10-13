import React, { useState, useEffect } from 'react';
import { ChatbotContainer, CloseButton, InputWrapper, SendButton, ChatContainer, ChatBubble, TitleWrapper } from '../styles/chatbotPopup'; 
import sendIcon from '../assets/images/send.png'; 

const ChatbotPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessages = [...messages, { text: message, isUser: true }];
      setMessages(newMessages);

      setTimeout(() => {
        const botReply = { text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);

      setMessage('');
    }
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false }]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ChatbotContainer>
      <CloseButton className="size_xxs pt_gy" onClick={onClose}>닫기</CloseButton>
      <TitleWrapper>
        <h2 className="size_lg weight_b">SOLT</h2>
        <p className="size_xs weight_sb">챗봇 ai</p>
      </TitleWrapper>
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
