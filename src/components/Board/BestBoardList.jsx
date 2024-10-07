import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  CarouselContainer,
  ImageWrapper,
  Image,
  Overlay,
  TextOverlay,
  NextArrow,
  PrevArrow,
  GlobalStyle, // GlobalStyle 추가
} from '../../styles/board/bestBoardList'; // 경로 수정

// 이미지 임포트
import img1 from '../../assets/images/sample/1.jpg';
import img2 from '../../assets/images/sample/2.jpg';
import img3 from '../../assets/images/sample/3.jpg';
import img4 from '../../assets/images/sample/4.jpg';
import img5 from '../../assets/images/sample/5.jpg';
import img6 from '../../assets/images/sample/6.jpg';
import img7 from '../../assets/images/sample/7.jpg';
import img8 from '../../assets/images/sample/8.jpg';
import img9 from '../../assets/images/sample/9.jpg';
import img10 from '../../assets/images/sample/10.jpg';

const BestBoardList = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여줄 이미지 개수
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <GlobalStyle /> {/* GlobalStyle 추가 */}
      <CarouselContainer>
        <Slider {...settings}>
          {images.map((src, index) => (
            <ImageWrapper key={index}>
              <Image src={src} alt={`Best post ${index + 1}`} />
              <Overlay />
              <TextOverlay>게시글 {index + 1}</TextOverlay>
            </ImageWrapper>
          ))}
        </Slider>
      </CarouselContainer>
    </>
  );
};

export default BestBoardList;
