import styled from "styled-components";

import leftBtn from '../../assets/images/ico/arrow_left.svg';
import rightBtn from '../../assets/images/ico/arrow_right.svg';

const PlanLoad = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 127px);

  // 백그라운드
  .background {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
  }

  // 컨텐츠
  .load_cont {
    position: fixed;
    z-index: 3;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;

    > div {
      width: 50%;
      margin: 0 auto;
      padding: 40px 0 70px;
      border-radius: 30px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background: #fff;
    }

    .load_icon {
      overflow: hidden;
      position: relative;
      height: 40px;
      margin-bottom: 20px;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 75px;
        transform: translate(-50%, -50%);
      }
    }

    h2 {
      margin-bottom: 5px;
    }
  }

  // 슬라이드
  .slick-slider {
    max-width: 600px;
    margin: 30px auto 0;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    top: 35%;
    width: 50px;

    &::before {
      display: inline-block;
      width: 50px;
      height: 50px;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #ddd;
      background: #fff no-repeat center center;
      font-size: 0;
    }
  }

  .slick-prev {
    left: -20%;

    &::before {
      background-image: url(${leftBtn});
    }
  }

  .slick-next {
    right: -20%;

    &::before {
      background-image: url(${rightBtn});
    }
  }

  .slide_thumb {
    text-align: center;

    img {
      display: inline-block;
      max-width: 100%;
      border-radius: 10px;
    }
  }

  .slide_desc {
    margin: 15px 12px 0;
  }

  /* media size */
  @media (max-width: 1000px) {
    .load_cont {
      > div {
        padding: 20px 14px 40px;
      }

      .load_icon {
        margin-bottom: 0;
      }

      h2 {
        font-size: 26px;
      }
    }

    .slick-prev {
      left: -22%;
    }

    .slick-next {
      right: -22%;
    }
  }

  @media (max-width: 700px) {
    .load_cont {
      > div {
        min-width: 250px;
        padding: 15px 12px 30px;
      }

      .load_icon {
        height: 30px;

        img {
          width: 48px;
        }
      }

      h2 {
        font-size: 20px;
      }
    }

    .slick-slider {
      margin-top: 15px;
    }

    .slick-prev,
    .slick-next {
      width: 28px;

      &::before {
        width: 28px;
        height: 28px;
      }
    }

    .slick-prev {
      left: -26%;
    }

    .slick-next {
      right: -22%;
    }
  }
`;

export default PlanLoad;