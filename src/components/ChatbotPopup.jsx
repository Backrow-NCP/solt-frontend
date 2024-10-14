import React, { useState, useEffect } from 'react';
import { ChatbotContainer, CloseButton, InputWrapper, SendButton, ChatContainer, ChatBubble, TitleWrapper } from '../styles/chatbotPopup'; 
import sendIcon from '../assets/images/send.png'; 

const ChatbotPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [responseCount, setResponseCount] = useState(0); // 챗봇 응답 횟수를 추적

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // 사용자 메시지를 추가
      const newMessages = [...messages, { text: message, isUser: true }];
      setMessages(newMessages);
  
      // 챗봇의 첫 번째와 두 번째 응답을 순서대로 처리
      setTimeout(() => {
        let botReply;
        if (responseCount === 0) {
          botReply = { text: '서울숲, 익선동, 경복궁, 남산타워 등이 많은 관광객들이 찾는 서울의 인기 여행지로 꼽힙니다.', isUser: false };
          setMessages((prevMessages) => [...prevMessages, botReply]);
          setResponseCount(responseCount + 1);
        } else if (responseCount === 1) {
          botReply = { text: '서울숲 주변에는 다양한 맛집이 있어요. 간략하게 몇 가지 추천해 드릴게요.', isUser: false };
          setMessages((prevMessages) => [...prevMessages, botReply]);
          setResponseCount(responseCount + 1);
  
          // 추가된 맛집 정보들을 0.3초 간격으로 자동 출력
          const restaurantRecommendations = [
            '클로리스 티룸: 서울숲 근처에 위치한 아늑한 티룸으로 다양한 티와 디저트를 즐길 수 있어요.',
            '바오바오: 홍콩 스타일의 바오를 맛볼 수 있는 곳으로, 소고기, 돼지고기, 새우 등 다양한 재료로 만든 바오를 제공합니다.',
            '카페 노티드: 맛있는 도넛과 커피로 유명한 카페입니다. ',
            '버터핑거 팬케익스: 팬케이크와 브런치를 즐기고 싶다면 이곳을 추천해요.'
          ];
  
          restaurantRecommendations.forEach((recommendation, index) => {
            setTimeout(() => {
              setMessages((prevMessages) => [...prevMessages, { text: recommendation, isUser: false }]);
            }, 600 * (index + 1)); // 0.3초 간격으로 메시지 출력
          });
        }
      }, 1000);
  
      setMessage('');
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      // 팝업이 열릴 때 첫 번째 자동 답변
      setMessages([{ text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false }]);
      setResponseCount(0); // 챗봇 응답 횟수 초기화
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
