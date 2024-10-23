import React, { useState, useEffect } from 'react';
import {
  ChatbotContainer,
  CloseButton,
  InputWrapper,
  SendButton,
  ChatContainer,
  ChatBubble,
  TitleWrapper,
} from '../styles/chatbotPopup';
import sendIcon from '../assets/images/ico/send.png';
import { apiNoToken } from '../config/AxiosConfig';

const ChatbotPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // 추가
  const [hasStarted, setHasStarted] = useState(false); // 첫 번째 메시지가 로드되었는지 여부 체크

  const handleInputChange = e => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      setLoading(true); // 로딩 시작
      const newMessages = [...messages, { text: message, isUser: true }];
      setMessages(newMessages);

      try {
        const response = await apiNoToken.post(`/chat`, {
          message: message,
        });
        const botReply = { text: response?.data?.content, isUser: false };
        setMessages(prevMessages => [...prevMessages, botReply]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: '오류가 발생했습니다.', isUser: false },
        ]);
      } finally {
        setLoading(false); // 로딩 종료
      }

      setMessage(''); // 입력 필드 초기화
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 팝업이 열릴 때 첫 번째 자동 답변
      setMessages([
        { text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false },
      ]);
      setHasStarted(true); // 첫 번째 메시지가 로드되었음을 표시
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ChatbotContainer>
      <CloseButton className="size_xxs pt_gy" onClick={onClose}>
        닫기
      </CloseButton>
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
        {loading && <ChatBubble> 잠시만요..</ChatBubble>}
      </ChatContainer>
      <InputWrapper>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()} // onKeyDown으로 변경
          placeholder="메시지를 입력하세요..."
          className="size_xs"
          disabled={loading} // 로딩 중에는 입력 필드 비활성화
        />
        <SendButton onClick={handleSendMessage}>
          <img src={sendIcon} alt="Send" />
        </SendButton>
      </InputWrapper>
    </ChatbotContainer>
  );
};

export default ChatbotPopup;

// import React, { useState, useEffect } from 'react';
// import { ChatbotContainer, CloseButton, InputWrapper, SendButton, ChatContainer, ChatBubble, TitleWrapper } from '../styles/chatbotPopup';
// import sendIcon from '../assets/images/ico/send.png';

// const ChatbotPopup = ({ isOpen, onClose }) => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [questionCount, setQuestionCount] = useState(0); // 사용자가 입력한 질문 수를 추적

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSendMessage = () => {
//     if (message.trim() !== '') {
//       setLoading(true); // 로딩 시작
//       const newMessages = [...messages, { text: message, isUser: true }];
//       setMessages(newMessages);
//       setQuestionCount(prevCount => prevCount + 1); // 질문 수 증가

//       // 첫 번째 질문에 대한 응답
//       if (questionCount === 0) {
//         setTimeout(() => {
//           const autoReply = { text: '서울 핫플 추천 리스트는 다음과 같습니다: 1) 경복궁 2) 한강공원 3) 홍대 카페거리', isUser: false };
//           setMessages((prevMessages) => [...prevMessages, autoReply]);
//           setLoading(false); // 로딩 종료
//         }, 1000); // 1초 후에 응답
//       }
//       // 두 번째 질문에 대한 응답
//       else if (questionCount === 1) {
//         setTimeout(() => {
//           const autoReply = { text: '홍대 맛집 추천 리스트: 1) 연남토마 본점 2) 미미네 3) 홍대 돈부리', isUser: false };
//           setMessages((prevMessages) => [...prevMessages, autoReply]);
//           setLoading(false); // 로딩 종료
//         }, 1000); // 1초 후에 응답
//       }
//       // 그 이후의 질문에 대한 기본 응답
//       else {
//         setTimeout(() => {
//           const defaultReply = { text: '자동응답 메시지입니다. 다른 질문을 해주세요.', isUser: false };
//           setMessages((prevMessages) => [...prevMessages, defaultReply]);
//           setLoading(false); // 로딩 종료
//         }, 1000); // 1초 후에 응답
//       }

//       setMessage(''); // 입력 필드 초기화
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       // 팝업이 열릴 때 첫 번째 자동 답변
//       setMessages([{ text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false }]);
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <ChatbotContainer>
//       <CloseButton className="size_xxs pt_gy" onClick={onClose}>닫기</CloseButton>
//       <TitleWrapper>
//         <h2 className="size_lg weight_b">SOLT</h2>
//         <p className="size_xs weight_sb">챗봇 ai</p>
//       </TitleWrapper>
//       <ChatContainer>
//         {messages.map((msg, index) => (
//           <ChatBubble key={index} $isUser={msg.isUser}>
//           {msg.text}
//         </ChatBubble>
//         ))}
//         {loading && <ChatBubble> 잠시만요..</ChatBubble>}
//       </ChatContainer>
//       <InputWrapper>
//       <input
//         type="text"
//         value={message}
//         onChange={handleInputChange}
//         onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}  // onKeyDown으로 변경
//         placeholder="메시지를 입력하세요..."
//         className="size_xs"
//         disabled={loading}  // 로딩 중에는 입력 필드 비활성화
//       />
//         <SendButton onClick={handleSendMessage}>
//           <img src={sendIcon} alt="Send" />
//         </SendButton>
//       </InputWrapper>
//     </ChatbotContainer>
//   );
// };

// export default ChatbotPopup;
