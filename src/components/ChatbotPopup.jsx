// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ChatbotContainer, CloseButton, InputWrapper, SendButton, ChatContainer, ChatBubble, TitleWrapper } from '../styles/chatbotPopup'; 
// import sendIcon from '../assets/images/ico/send.png'; 

// const ChatbotPopup = ({ isOpen, onClose }) => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false); // 추가
//   const [hasStarted, setHasStarted] = useState(false); // 첫 번째 메시지가 로드되었는지 여부 체크


//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSendMessage = async () => {
//     if (message.trim() !== '') {
//       setLoading(true); // 로딩 시작
//       const newMessages = [...messages, { text: message, isUser: true }];
//       setMessages(newMessages);

//       const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옴
  
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_API_URL}/clovaX/chat`, {
//           message: message,
//         },
//         {
//           headers: {
//             Authorization: token, // 인증 토큰 추가
//           },
//         });
//         const botReply = { text: response.data.reply, isUser: false };
//         setMessages((prevMessages) => [...prevMessages, botReply]);
//       } catch (error) {
//         console.error('Error sending message:', error);
//         setMessages((prevMessages) => [...prevMessages, { text: '오류가 발생했습니다.', isUser: false }]);
//       } finally {
//         setLoading(false); // 로딩 종료
//       }
  
//       setMessage(''); // 입력 필드 초기화
//     }
//   };
  
  
//   useEffect(() => {
//     if (isOpen) {
//       // 팝업이 열릴 때 첫 번째 자동 답변
//       setMessages([{ text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false }]);
//       setHasStarted(true); // 첫 번째 메시지가 로드되었음을 표시
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


import React, { useState, useEffect } from 'react';
import { ChatbotContainer, CloseButton, InputWrapper, SendButton, ChatContainer, ChatBubble, TitleWrapper } from '../styles/chatbotPopup'; 
import sendIcon from '../assets/images/ico/send.png'; 

const ChatbotPopup = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // 첫 번째 메시지가 로드되었는지 여부 체크

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setLoading(true); // 로딩 시작
      const newMessages = [...messages, { text: message, isUser: true }];
      setMessages(newMessages);

      setTimeout(() => {
        // 세 개의 말풍선으로 나누어 응답 설정 (1초 후에 추가)
        const botReplies = [
          { text: `서울에서 핫한 플레이스 몇 곳을 추천드릴게요`, isUser: false },
          { text: `서울숲, 성수동, 한남동이 요즘 방문하기가 좋습니다.`, isUser: false },
          { text: `이 중에서 가보고 싶은 곳을 찾아보시는 건 어떠신가요?`, isUser: false },
        ];

        botReplies.forEach((reply, index) => {
          setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, reply]);
          }, index * 1000); // 0.3초 간격으로 추가
        });

        setLoading(false); // 로딩 종료
      }, 1000); // 1초 뒤에 botReplies 추가

      setMessage(''); // 입력 필드 초기화
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 팝업이 열릴 때 첫 번째 자동 답변
      setMessages([{ text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false }]);
      setHasStarted(true); // 첫 번째 메시지가 로드되었음을 표시
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
        {loading && <ChatBubble> 잠시만요..</ChatBubble>}
      </ChatContainer>
      <InputWrapper>
      <input 
        type="text" 
        value={message} 
        onChange={handleInputChange} 
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}  // onKeyDown으로 변경
        placeholder="메시지를 입력하세요..."
        className="size_xs"
        disabled={loading}  // 로딩 중에는 입력 필드 비활성화
      />
        <SendButton onClick={handleSendMessage}>
          <img src={sendIcon} alt="Send" />
        </SendButton>
      </InputWrapper>
    </ChatbotContainer>
  );
};

export default ChatbotPopup;
