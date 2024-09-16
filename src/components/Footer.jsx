import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo_f.svg';

const Footer = () => {
  return (
    <footer>
      <div class="inner flex">
        <h2>
          <a href="/"><img src={logo} alt="SOLO TRIP"></img></a>
        </h2>
        <div class="info size_xs pt_gy">
          <span>회사명: 백로우(BackRow)</span>
          <span>전화번호: 02-234-5678</span><br />
          <span>제작자: 임수한, 박상도, 권정현, 박지수, 윤영훈, 김성훈, 김유나</span><br />
          <span>주소: (06134) 서울시 강남구 강남대로 94길 20 삼오빌딩 5-9층</span>
          <span>사업자 등록번호: 000-11-99999</span>
          <p>Copyright © BackRow. All Rights Reserved.</p>
        </div>
        <ul class="menu size_sm">
          <li><a href="javascript:void(0)">개인처리보호방침</a></li>
          <li><a href="javascript:void(0)">이용약관</a></li>
        </ul>
      </div>

      <ul class="floating">
        <li>
          <button id="chatbot"><img src="" alt="챗봇창 열기" /></button>
        </li>
        <li>
          <button id="up"><img src="" alt="최상단으로 이동" /></button>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
