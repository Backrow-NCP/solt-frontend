import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  CarouselContainer,
  ImageWrapper,
  Image,
  TextOverlay,
  NextArrow,
  PrevArrow,
  GlobalStyle,
  OverlayBlack,
} from '../../styles/board/bestBoardList';

const BestBoardList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const url = `${process.env.REACT_APP_API_URL}/board/list`;
        // const response = await axios.get(url);
        const response = await axios.get('/sampledata.json');
        let data = response.data.dtoList;

        // likeCount가 높은 순서로 정렬, likeCount가 같으면 regDate 최신순으로 정렬
        data = data.sort((a, b) => {
          if (b.likeCount !== a.likeCount) {
            return b.likeCount - a.likeCount;
          }
          return new Date(b.regDate) - new Date(a.regDate);
        });

        // 상위 10개의 게시글을 추출
        let top10Items = data.slice(0, 10);
        const tenthItem = top10Items[9];
        top10Items = [tenthItem, ...top10Items.slice(0, 9)];

        setItems(top10Items);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleItemClick = boardId => {
    navigate(`/board/detail/${boardId}`);
  };

  return (
    <>
      <GlobalStyle />
      <CarouselContainer>
        <Slider {...settings}>
          {items.map((item, index) => (
            <ImageWrapper
              key={item.boardId}
              onClick={() => handleItemClick(item.boardId)}
            >
              <Image
                src={
                  item.images && item.images.length > 0
                    ? item.images[0]?.fileName
                    : '/sampleImage/nonImage.jpg'
                }
                alt={`Best post ${index + 1}`}
              />
              <OverlayBlack />
              <TextOverlay>
                <span className="author">
                  작성자: {item.member?.name || '알 수 없음'}
                </span>
                <br />
                <div className="locationDurationContainer">
                  <div className="locationBox">
                    {item.location || '위치 없음'}
                  </div>
                  <div className="durationBox">
                    {item.duration || '기간 없음'}
                  </div>
                </div>
                <h3 className="bestTitle size_xl">{item.title}</h3>
                <div className="contentBox size_lg">{item.content}</div>
                <div className="bestLikeCount">
                  <span className="heart">♥</span> {item.likeCount}
                </div>
              </TextOverlay>
            </ImageWrapper>
          ))}
        </Slider>
      </CarouselContainer>
    </>
  );
};

export default BestBoardList;
