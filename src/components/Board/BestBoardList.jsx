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

  // 이미지 URL 설정
  const imageUrl = item =>
    item.image?.length > 0
      ? `${process.env.REACT_APP_IMAGE_STORAGE_URL}${item.image[0].fileName}`
      : defaultImage; // 기본 이미지 설정

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

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
