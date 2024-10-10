import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
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
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/sampledata.json'); // 로컬 JSON 파일 경로
        let data = response.data.dtoList;

        // likeCount가 높은 순서로 정렬, likeCount가 같으면 regDate 최신순으로 정렬
        data = data.sort((a, b) => {
          if (b.likeCount !== a.likeCount) {
            return b.likeCount - a.likeCount;
          }
          return new Date(b.regDate) - new Date(a.regDate); // 최신순 정렬
        });

        // 상위 10개의 게시글을 추출
        let top10Items = data.slice(0, 10);

        // 10번째 게시글을 1순위로 이동시키고 나머지 뒤로 미루기
        const tenthItem = top10Items[9]; // 10번째 게시글
        top10Items = [tenthItem, ...top10Items.slice(0, 9)]; // 10번째 게시글을 앞으로, 나머지는 뒤로

        setItems(top10Items); // 상태에 저장
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
    // 게시물 클릭 시 호출되는 함수
    navigate(`/board/detail/${boardId}`); // 게시물 상세 페이지로 이동
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
              {' '}
              {/* 클릭 핸들러 추가 */}
              <Image
                src={item.images[0]?.fileName || '/sampleImage/nonImage.jpg'} // 이미지 경로
                alt={`Best post ${index + 1}`}
              />
              <OverlayBlack />
              <TextOverlay>
                <span className="author">작성자: {item.member.name}</span>
                <br />
                <div className="locationDurationContainer">
                  <div className="locationBox">{item.location}</div>
                  <div className="durationBox">{item.duration}</div>
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
