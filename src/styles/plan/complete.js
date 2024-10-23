import styled from "styled-components";

const PlanComplete = styled.div`
  margin-top: 80px;
  text-align: center;

  .price {
    justify-content: center;
    align-items: center;
    margin: 20px 0 32px;

    > span {
      display: inline-block;
      margin-right: 12px;
      padding: 6px 8px;
      border: 1px solid #F78C9F;
      border-radius: 5px;
      background: rgba(247, 140, 159, 0.06);
      line-height: 1;
      vertical-align: text-bottom;
    }

    > strong {
      display: inline-block;
      font-size: 26px;
      font-weight: 700;
      line-height: 1;

      span {
        font-size: 45px;
      }
    }
  }

  // 슬라이드
  .slick-slider {
    overflow: hidden;
    position: relative;
    height: 20vh;
    margin-left: 17%;

    &.full {
      height: auto;

      &::before {
        display: none;
      }
    }
    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30%;
      background: linear-gradient(to bottom, transparent, #fff);
    }
    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      width: 30%;
      height: 100%;
      background: linear-gradient(to right, transparent, #fff);
    }

    .slick-track {
      display: flex;
      flex-wrap: nowrap;
    }

    .slick-slide {
      float: none;
      margin-right: 16px;
      padding: 24px;
      border: 1px solid #ddd;
      border-radius: 16px;
    }
  }

  // 버튼
  .btn_view {
    margin-top: 32px;
    text-decoration: underline;
  }

  .button_box {
    margin-top: 50px;
    justify-content: center;
    gap: 20px;

    button {
      width: 400px;
      padding: 20px 0;
    }
  }

  /* media size */
  @media (max-width: 700px) {
    .price {
      > strong {
        font-size: 20px;

        span {
          font-size: 26px;
        }
      }
    }

    .slick-slider {
      .slick-slide {
        margin-right: 12px;
        padding: 20px 15px;
        border-radius: 12px;
      }
    }
    
    .button_box {
      gap: 10px;

      button {
        padding: 15px 0;
        font-size: 15px;
      }
    }
  }
`;

export default PlanComplete;