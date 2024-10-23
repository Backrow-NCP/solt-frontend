import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import defaultImage from '../../assets/images/sample/nonImage.jpg';
import axios from 'axios';

const BestBoardList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 데이터 가져오기 함수
  const fetchData = async () => {
    const params = {
      page: 1, // 페이지 1
      size: 10, // 사이즈 5
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/boards/list`,
        { params }
      );
      setItems(response.data.dtoList || []); // dtoList에서 데이터 가져오기
      response.data.dtoList.forEach(item => {
        console.log(item);
      });
    } catch (err) {
      setError(err);
      console.error('게시글 데이터 가져오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = boardId => {
    try {
      navigate(`/board/detail/${boardId}`);
    } catch (error) {
      console.error('게시물 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dayInMilliseconds = 24 * 60 * 60 * 1000;

    // 두 날짜 차이 계산
    const diffInMilliseconds = end - start;
    const diffInDays = Math.round(diffInMilliseconds / dayInMilliseconds);

    if (diffInDays === 0) {
      return '당일치기';
    }

    const nights = diffInDays; // 숙박 일수
    const days = nights + 1; // 총 일수

    return `${nights}박 ${days}일`;
  };

  // 이미지 URL 설정
  const imageUrl = item =>
    item.images?.length > 0
      ? `${process.env.REACT_APP_IMAGE_STORAGE_URL}${item.images[0].fileName}`
      : defaultImage; // 기본 이미지 설정

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  console.log('bestBoardList의 items', items);
  console.log('bestBoardList의 이미지 url 체크', imageUrl(items));
  return (
    <>
      <GlobalStyle />
      <CarouselContainer>
        <Slider {...settings}>
          {items.map((item, index) => (
            <ImageWrapper
              key={item.boardId}
              onClick={() => handleClick(item.boardId)}
            >
              <Image src={imageUrl(item)} alt={`Best post ${index + 1}`} />
              <OverlayBlack />
              <TextOverlay>
                <span className="author">
                  작성자: {item.member?.name || '알 수 없음'}
                </span>
                <div className="locationDurationContainer">
                  <div className="locationBox">
                    {item.plan.location || '위치 없음'}
                  </div>
                  <div className="durationBox">
                    {calculateDuration(
                      item.plan.startDate,
                      item.plan.endDate
                    ) || '기간 없음'}
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
