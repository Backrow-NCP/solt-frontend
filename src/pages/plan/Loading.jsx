import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PlanLoad from "../../styles/plan/load";

import LoadingGIF from '../../assets/images/ico/plan_loading.gif';
import Image01 from '../../assets/images/bn/plan_load_01.jpg';
import Image02 from '../../assets/images/bn/plan_load_02.jpg';
import Image03 from '../../assets/images/bn/plan_load_03.jpg';
import Image04 from '../../assets/images/bn/plan_load_04.jpg';
import Image05 from '../../assets/images/bn/plan_load_05.jpg';
import Image06 from '../../assets/images/bn/plan_load_06.jpg';
import Image07 from '../../assets/images/bn/plan_load_07.jpg';

// 랜덤 힘수
const getRandomSlides = (slides) => {
  return slides.sort(() => Math.random() - 0.5);
};

const Loading = () => {
  const [slides, setSlides] = useState([]);

  // list
  const slideData = [
    { id: 1, category: "서울특별시", imgSrc: Image01, name: "경복궁", description: "경복궁은 서울의 아름다운 전통 궁궐로, 한국의 역사와 문화를 체험할 수 있습니다" },
    { id: 2, category: "서울특별시", imgSrc: Image02, name: "남산타워", description: "남산타워는 서울 남산에 위치한 전망대로, 아름다운 서울의 전경과 야경을 감상할 수 있습니다" },
    { id: 3, category: "서울특별시", imgSrc: Image03, name: "롯데월드", description: "롯데월드는 서울에 위치한 대형 테마파크로, 다양한 놀이기구와 쇼를 즐길 수 있습니다" },
		{ id: 4, category: "서울특별시", imgSrc: Image04, name: "한옥거리", description: "한옥거리는 전통 한옥이 늘어선 거리로, 전통 건축과 문화를 경험할 수 있는 관광 명소입니다" },
		{ id: 5, category: "서울특별시", imgSrc: Image05, name: "노들섬", description: "노들섬은 한강에 위치한 문화 공간으로, 공연과 전시, 산책을 즐길 수 있습니다" },
		{ id: 6, category: "서울특별시", imgSrc: Image06, name: "동대문디자인플라자", description: "동대문디자인플라자는 현대적인 디자인과 문화를 체험할 수 있는 인기 장소입니다" },
		{ id: 7, category: "서울특별시", imgSrc: Image07, name: "명동거리", description: "명동거리는 대표적인 쇼핑 거리로, 다양한 브랜드 매장과 맛집, 거리 공연을 즐길 수 있습니다" },
  ];

  // 랜덤
  useEffect(() => {
    setSlides(getRandomSlides(slideData));
  }, []);

	// 슬릭 설정
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
		pauseOnFocus: true,
		pauseOnHover: true,
  };

  return (
    <PlanLoad>
      <div className="background"></div>
      <div className="load_cont">
        <div>
					<div className="load_icon"><img src={LoadingGIF} alt="로딩중" /></div>
					<h2>일정을 만들고 있어요!</h2>
					<p className="pt_gy size_xs">여행 지역의 관광 명소를 안내해 드릴게요😊</p>

					<Slider {...settings}>
						{slides.map((slide) => (
							<div key={slide.id}>
								<div className="slide_thumb">
									<img src={slide.imgSrc} alt={slide.name} />
								</div>
								<p className="slide_desc size_sm">{slide.description}</p>
							</div>
						))}
					</Slider>
				</div>
      </div>
    </PlanLoad>
  );
};

export default Loading;