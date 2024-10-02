import { Link } from 'react-router-dom';
import MainArea from '../styles/main/mainArea.js';
import SpecialService from '../styles/main/specialService.js';

import banner from '../assets/images/bn/main.jpg';
import service01 from '../assets/images/bn/service_01.jpg';
import service02 from '../assets/images/bn/service_02.jpg';
import sample from '../assets/images/bn/sample.jpg';

const Home = () => {
  const specialItems = [
    {
      subtitle: '예산이 얼마나 필요할까?',
      title: '사용자 일정에 따라<br />즉시 반영되는 총 예상 금액!',
      imgSrc: sample,
      imgAlt: 'sample',
    },
    {
      subtitle: '솔트가 꼼꼼하게 따져드려요!',
      title: '이번 여행, 어디에 제일 썼지?<br />경비 비율을 한눈에 확인하세요!',
      imgSrc: sample,
      imgAlt: 'sample',
    },
    {
      subtitle: '키워드 추천 해드려요',
      title: '내 취향과 라이프스타일에 딱!<br />맞춤형 키워드 추천',
      imgSrc: sample,
      imgAlt: 'sample',
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

          <div className="logo_anim">
            <svg
              className="shape1"
              xmlns="http://www.w3.org/2000/svg"
              width="149"
              height="149"
              fill="none"
            >
              <path
                fill="#15B8FF"
                d="M9.01 148.102s28.978-37.341 4.515-73.97C-13.068 33.202 9.828.162 9.828.162h125.283s-22.867 33.035 3.71 73.958c24.456 36.638-4.634 73.982-4.634 73.982H9.009Z"
              />
            </svg>
            <svg
              className="shape2"
              xmlns="http://www.w3.org/2000/svg"
              width="149"
              height="148"
              fill="none"
            >
              <path
                fill="#FFD600"
                fillRule="evenodd"
                d="M.697 73.899C.697 33.086 33.783 0 74.597 0c40.813 0 73.898 33.086 73.898 73.899s-33.085 73.899-73.899 73.899c-40.813 0-73.899-33.086-73.899-73.899Z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="shape3"
              xmlns="http://www.w3.org/2000/svg"
              width="148"
              height="149"
              fill="none"
            >
              <path
                fill="#F78CA0"
                d="M.146.213h49.266v51.161h49.265v48.318h49.267v48.319H.146V.213Z"
              />
            </svg>
            <svg
              className="shape4"
              xmlns="http://www.w3.org/2000/svg"
              width="154"
              height="155"
              fill="none"
            >
              <path
                fill="#36E0C5"
                d="M.799.89H153.59C158.003 34.997 109 43.198 109 77.567c0 34.369 49.003 42.57 44.59 76.677H.799c-4.413-34.107 44.59-42.308 44.59-76.677C45.39 43.197-3.614 34.997.8.89Z"
              />
            </svg>
          </div>
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
