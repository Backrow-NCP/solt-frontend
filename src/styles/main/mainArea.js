import styled from 'styled-components';
import serviceIcon01 from '../../assets/images/ico/service_ai.svg';
import serviceIcon02 from '../../assets/images/ico/service_share.svg';
import banner from '../../assets/images/bn/main.jpg';

const MainArea = styled.div`
  flex-wrap: nowrap !important;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;

  .main_banner img {
    border-radius: 32px;
    user-drag: none;
    -webkit-user-drag: none;
  }

  section {
    justify-content: space-between;
    flex-direction: column;
    width: 728px;
    padding: 104px 58px 80px;
    box-sizing: border-box;
  }
  section .title_box {
    position: relative;
    z-index: 1;
    background: #fff;
  }
  section .title_box h2 {
    font-size: 40px;
  }
  section .title_box h2 span:last-child {
    margin-left: 22px;
  }
  section .title_box p {
    margin-top: 24px;
  }
  section .logo_anim {
    position: relative;
    height: 270px;
  }
  section .logo_anim svg {
    position: absolute;
    top: -120px;
    opacity: 0;
  }
  section .logo_anim .shape1 {
    left: 90px;
    animation: pour1 1.6s ease-in-out forwards;
    animation-delay: 1.2s;
  }
  section .logo_anim .shape2 {
    left: 155px;
    animation: pour2 1.6s ease-in-out forwards;
    animation-delay: 2.5s;
  }
  section .logo_anim .shape3 {
    left: 215px;
    animation: pour3 1s ease-in-out forwards;
  }
  section .logo_anim .shape4 {
    left: 327px;
    animation: pour4 1.2s ease-in-out forwards;
    animation-delay: 1s;
  }

  @keyframes pour1 {
    0% {
      opacity: 0;
      transform: translateY(0) rotateZ(-5deg);
    }
    30% {
      opacity: 1;
      transform: translateY(98px) rotateZ(-5deg);
    }
    40% {
      opacity: 1;
      transform: translateX(-20px) translateY(124px) rotateZ(-30deg);
    }
    70% {
      opacity: 1;
      transform: translateX(-60px) translateY(218px) rotateZ(-40deg);
    }
    100% {
      opacity: 1;
      transform: translateX(-28px) translateY(232px) rotateZ(-10deg);
    }
  }
  @keyframes pour2 {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(95px);
      opacity: 1;
    }
    40% {
      opacity: 1;
      transform: translateX(45px) translateY(95px) rotate(45deg);
    }
    60% {
      opacity: 1;
      transform: translateX(80px) translateY(112px) rotate(60deg);
    }
    100% {
      opacity: 1;
      transform: translateX(93px) translateY(123px) rotate(60deg);
    }
  }
  @keyframes pour3 {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(242px);
      opacity: 1;
    }
  }
  @keyframes pour4 {
    0% {
      transform: translateY(0);
    }
    70% {
      transform: translateY(188px);
      opacity: 1;
    }
    100% {
      transform: translateX(33px) translateY(212px) rotate(25deg);
      opacity: 1;
    }
  }

  .service_list {
    flex-direction: column;
    justify-content: space-between;
  }
  .service_list li {
    overflow: hidden;
    border: 1px solid #eee;
    border-radius: 32px;
    box-sizing: border-box;
  }
  .service_list li a {
    display: block;
  }
  .service_list li a .thumb > img {
    width: 100%;
    transition: 0.2s;
  }
  .service_list li:hover a .thumb > img {
    opacity: 0.7;
  }
  .service_list li a .cont {
    position: relative;
    padding: 25px 9%;
  }
  .service_list li a .cont p {
    margin-bottom: 10px;
    padding-left: 32px;
    background: no-repeat left center;
    line-height: 24px;
  }
  .service_list li:nth-child(1) a .cont p {
    background-image: url(${serviceIcon01});
  }
  .service_list li:nth-child(2) a .cont p {
    background-image: url(${serviceIcon02});
  }
  .service_list li a .cont h3 {
    line-height: 1.4;
  }
  .service_list li a .cont span {
    display: inline-block;
    position: absolute;
    top: -15px;
    left: 45%;
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #F78C9F;
    font-weight: 400;
    color: #fff;
    animation: float 2s ease-in-out infinite;
  }
  .service_list li a .cont span::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 14px;
    border-top: 13px solid #F78C9F;
    border-left: 2px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 13px solid transparent;
    border-radius: 8px;
  }
  @keyframes float {
      0% {
          transform: translateY(0);
      }
      50% {
          transform: translateY(8px);
      }
      100% {
          transform: translateY(0);
      }
  }

  /* media size */
  @media (max-width: 1650px) {
    section {
      width: 700px;
      padding: 80px 58px;
    }
    section .title_box h2 {
      font-size: 34px;
    }
    section .logo_anim {
      height: 250px;
      transform: scale(0.7) translateX(-55px);
    }
    .service_list li a .cont {
      padding: 20px 9%;
    }
    .service_list li a .cont p {
      margin-bottom: 4px;
      gap: 20px;
    }
  }

  @media (max-width: 1215px) {
    flex-wrap: wrap !important;
    gap: 40px 20px;

    .main_banner {
      width: 40%;
    }
    .main_banner img {
      content: url(${banner});
    }
    section {
      width: calc(60% - 20px);
      padding: 25px 30px 0;
    }
    section .title_box h2 {
      font-size: 28px;
    }
    section .title_box p {
      margin-top: 10px;
    }
    section .logo_anim {
      height: 180px;
      transform: scale(0.5) translateX(-20%);
    }
    .service_list {
      flex-direction: row;
      justify-content: center;
      gap: 20px;
      width: 100%;
    }
    .service_list li {
      width: 35%;
    }
    .service_list li a .cont span {
      top: -20px;
      padding: 6px 12px;
    }
  }

  @media (max-width: 800px) {
    section {
      transform: scale(0.8) translate(-10%, -12%);
    }
  }

  @media (max-width: 700px) {
    .main_banner {
      width: 100%;
    }
    section {
      width: 100%;
      padding: 0;
      text-align: center;
      transform: none;
    }
    section .title_box h2 {
      font-size: 25px;
    }
    section .title_box span {
      margin: 0;
    }
    section .title_box p {
      display: none;
    }
    section .logo_anim {
      display: none;
    }
    .service_list {
      gap: 2%;
    }
    .service_list li {
      width: 49%;
    }
    .service_list li a .cont span {
      top: -15px;
      padding: 4px 10px;
      font-size: 10px;
    }
  }
`;

export default MainArea;