import { Link } from 'react-router-dom';

import { Player } from '@lottiefiles/react-lottie-player';
import MainArea from '../styles/main/mainArea.js';
import SpecialService from '../styles/main/specialService.js';

import banner from '../assets/images/bn/main.jpg';

import animationLogo from '../assets/images/ico/BannerObj.json';
import service01 from '../assets/images/bn/service_01.jpg';
import service02 from '../assets/images/bn/service_02.jpg';
import special01 from '../assets/images/bn/service_info_01.jpg';
import special02 from '../assets/images/bn/service_info_02.jpg';
import special03 from '../assets/images/bn/service_info_03.jpg';

const Home = () => {
  const specialItems = [
    {
      subtitle: '키워드 추천 해드려요',
      title: '내 취향과 라이프스타일에 딱!<br />맞춤형 키워드 추천',
      imgSrc: special01,
      imgAlt: '여행 테마 선택 이미지',
    },
    {
      subtitle: '예산이 얼마나 필요할까?',
      title: '이번 여행, 어디에 제일 썼지?<br />경비 비율을 한눈에 확인하세요!',
      imgSrc: special02,
      imgAlt: '일정 예상 금액 확인 이미지',
    },
    {
      subtitle: '일정 소장하고 공유해요',
      title: '완성된 나만의 일정,<br />파일로 소장하고, 공유하기도 가능!',
      imgSrc: special03,
      imgAlt: '일정 저장 이미지',
    },
  ];

  return (
    <div className="inner">
      {/* 섹션 1 */}
      <MainArea className="flex">
        <div className="main_banner">
          <img src={banner} alt="solo trip" />
        </div>

        <section className="flex">
          <div className="title_box">
            <h2>
              <span>혼자 떠나는 여행</span>
              <br />
              <span>일정 관리는 솔트와 함께!</span>
            </h2>
            <p className="pt_gy size_lg weight_md">
              3분 투자로 나만의 맞춤 여행 일정 만들어 보세요
            </p>
          </div>

          <Player autoplay loop src={animationLogo} />
        </section>

        <ul className="service_list flex">
          <li className="service_plan">
            <Link to="/plan/survey">
              <div className="thumb">
                <img src={service01} alt="plan write" />
              </div>
              <div className="cont weight_md">
                <p className="pt_blue">솔트 AI 플래너</p>
                <h3 className="size_xl weight_md">
                  클릭 몇 번이면 단숨에!
                  <br />
                  여행 계획 만들기
                </h3>
                <span className="size_xs">여행 계획 바로 시작!</span>
              </div>
            </Link>
          </li>
          <li className="service_board">
            <Link to="/board/list">
              <div className="thumb">
                <img src={service02} alt="plan master" />
              </div>
              <div className="cont weight_md">
                <p className="pt_blue">플랜 공유하기</p>
                <h3 className="size_xl weight_md">
                  여행 고수들은
                  <br />
                  어디에서 뭐 하나요?
                </h3>
              </div>
            </Link>
          </li>
        </ul>
      </MainArea>

      {/* 섹션 2 */}
      <SpecialService className="special_service">
        <h2>솔트에서만 볼 수 있는 특별한 서비스</h2>

        <ul className="flex">
          {specialItems.map((item, index) => (
            <li key={index}>
              <div className="cont">
                <p className="size_lg pt_gy">{item.subtitle}</p>

                <h3
                  className="weight_sb"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
              </div>
              <div className="thumb">
                <img src={item.imgSrc} alt={item.imgAlt} />
              </div>
            </li>
          ))}
        </ul>
      </SpecialService>
    </div>
  );
};

export default Home;
