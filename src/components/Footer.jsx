
import React from 'react';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import scrollTop from '../services/scrollTop';
import ChatbotPopup from './ChatbotPopup';


import logo from '../assets/images/logo_f.svg';
import ai from '../assets/images/ico/floating_ai.svg';
import up from '../assets/images/ico/floating_up.svg';

const Footer = () => {

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };


  return (
    <footer>
      <div className="inner flex">
        <h2 className="logo">

          <a href="/"><img src={logo} alt="SOLO TRIP"></img></a>
        </h2>
        <div className="info size_xs pt_gy">
          <span>회사명: 백로우(BackRow)</span>
          <span>전화번호: 02-234-5678</span><br />
          <span>관리자: 임수한, 박상도, 권정현, 박지수, 윤영훈, 김성훈, 김유나</span><br />
          <span>주소: (06134) 서울시 강남구 강남대로 94길 20 삼오빌딩 5-9층</span>
          <span>사업자 등록번호: 000-11-99999</span>
          <p>Copyright © BackRow. All Rights Reserved.</p>
        </div>
        <ul className="menu size_sm">
          <li>
            <a href="#none">개인처리보호방침</a>
          </li>
          <li>
            <a href="#none">이용약관</a>
          </li>
        </ul>
      </div>

      {/* floating과 ChatbotPopup을 함께 묶어서 flex로 배치 */}
      <div className="floating-wrapper">
        <ul className="floating">
          <li>
            <button id="chatbot" onClick={toggleChatbot}>
              <img src={ai} alt="챗봇창 열기" />
            </button>
          </li>
          <li>
            <button id="up" onClick={scrollTop}>
              <img src={up} alt="최상단으로 이동" />
            </button>
          </li>
        </ul>

        {/* Chatbot Popup을 함께 배치 */}
        {isChatbotOpen && (
          <ChatbotPopup isOpen={isChatbotOpen} onClose={toggleChatbot} />
        )}
      </div>

    </footer>
  );
};

export default Footer;
