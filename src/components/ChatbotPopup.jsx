import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChatbotContainer, CloseButton, InputWrapper, SendButton, ChatContainer, ChatBubble, TitleWrapper } from '../styles/chatbotPopup'; 
import sendIcon from '../assets/images/send.png'; 

const ChatbotPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      // 사용자 메시지를 추가
      const newMessages = [...messages, { text: message, isUser: true }];
      setMessages(newMessages);
      
      try {
        // Clova X API에 사용자 메시지를 보냄
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/clovaX/chat`, {
          message: message,
          clientId: process.env.REACT_APP_NAVER_CLIENT_ID, // 환경 변수에 저장된 값
          clientSecret: process.env.REACT_APP_NAVER_CLIENT_SECRET
        }, {
          headers: {
            'X-NCP-CLOVASTUDIO-API-KEY': process.env.REACT_APP_CLOVA_X_API_KEY,
            'X-NCP-APIGW-API-KEY': process.env.REACT_APP_CLOVA_X_GATEWAY_KEY,
            'Content-Type': 'application/json'
          }
        });
        // 챗봇 응답 처리
        const botReply = { text: response.data.reply, isUser: false };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [...prevMessages, { text: '오류가 발생했습니다.', isUser: false }]);
      }

      setMessage(''); // 입력 필드 초기화
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      // 팝업이 열릴 때 첫 번째 자동 답변
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
          <ChatBubble key={index} $isUser={msg.isUser}>
          {msg.text}
        </ChatBubble>
        ))}
      </ChatContainer>
      <InputWrapper>
        <input 
          type="text" 
          value={message} 
          onChange={handleInputChange} 
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
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
