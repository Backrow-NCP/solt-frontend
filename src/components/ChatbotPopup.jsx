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
      // 사용자 메시지를 추가
      const newMessages = [...messages, { text: message, isUser: true }];
      setMessages(newMessages);

      // 사용자의 메시지에 대한 챗봇의 두 번째 답변
      setTimeout(() => {
        const secondBotReply = { text: '서울숲, 익선동, 경복궁, 남산타워 등이 많은 관광객들이 찾는 서울의 인기 여행지로 꼽힙니다.', isUser: false };
        setMessages((prevMessages) => [...prevMessages, secondBotReply]);
      }, 1000);

      setMessage('');
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
