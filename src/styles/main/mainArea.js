import styled from 'styled-components';
import serviceIcon01 from '../../assets/images/ico/service_ai.svg';
import serviceIcon02 from '../../assets/images/ico/service_share.svg';
import banner from '../../assets/images/bn/main_s.jpg';

const MainArea = styled.div`
  flex-wrap: nowrap !important;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;

  .main_banner {
    img {
      border-radius: 32px;
      user-drag: none;
      -webkit-user-drag: none;
    }
  }

  section {
    justify-content: space-between;
    flex-direction: column;
    width: 728px;
    padding: 104px 58px 80px;
    box-sizing: border-box;

    .title_box {
      position: relative;
      z-index: 1;
      background: #fff;

      h2 {
        font-size: 40px;

        span:last-child {
          margin-left: 22px;
        }
      }

      p {
        margin-top: 24px;
      }
    }
  }

  .service_list {
    flex-direction: column;
    justify-content: space-between;

    li {
      overflow: hidden;
      border: 1px solid #eee;
      border-radius: 32px;
      box-sizing: border-box;

      a {
        display: block;

        .thumb > img {
          width: 100%;
          transition: 0.2s;
        }

        .cont {
          position: relative;
          padding: 25px 9%;

          p {
            margin-bottom: 10px;
            padding-left: 32px;
            background: no-repeat left center;
            line-height: 24px;
          }

          h3 {
            line-height: 1.4;
          }

          span {
            display: inline-block;
            position: absolute;
            top: -15px;
            left: 45%;
            padding: 8px 12px;
            border-radius: 8px;
            background-color: #F78C9F;
            font-weight: 400;
            color: #fff;
            animation: float 2s ease-in-out infinite;

            &::after {
              content: "";
              position: absolute;
              bottom: -20px;
              left: 14px;
              border-top: 13px solid #F78C9F;
              border-left: 2px solid transparent;
              border-right: 20px solid transparent;
              border-bottom: 13px solid transparent;
              border-radius: 8px;
            }
          }
        }

        &:hover .thumb > img {
          opacity: 0.7;
        }
      }

      &:nth-child(1) .cont p {
        background-image: url(${serviceIcon01});
      }

      &:nth-child(2) .cont p {
        background-image: url(${serviceIcon02});
      }
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(8px);
    }
    100% {
      transform: translateY(0);
    }
  }

  /* media size */
  @media (max-width: 1650px) {
    section {
      width: 700px;
      padding: 80px 58px;

      .title_box {
        h2 {
          font-size: 34px;
        }
      }

      .logo_anim {
        height: 250px;
        transform: scale(0.7) translateX(-55px);
      }

      .service_list li .cont {
        padding: 20px 9%;

        p {
          margin-bottom: 4px;
          gap: 20px;
        }
      }
    }
  }

  @media (max-width: 1215px) {
    flex-wrap: wrap !important;
    gap: 40px 20px;

    .main_banner {
      width: 40%;

      img {
        content: url(${banner});
      }
    }

    section {
      width: calc(60% - 20px);
      padding: 25px 30px 0;

      .title_box {
        h2 {
          font-size: 28px;
        }

        p {
          margin-top: 10px;
        }
      }

      .logo_anim {
        height: 180px;
        transform: scale(0.5) translateX(-20%);
      }
    }

    .service_list {
      flex-direction: row;
      justify-content: center;
      gap: 20px;
      width: 100%;

      li {
        width: 35%;

        .cont {
          span {
            top: -20px;
            padding: 6px 12px;
          }
        }
      }
    }
  }

  @media (max-width: 800px) {
    section {
      transform: scale(0.8) translate(-10%, -12%);
    }
  }

  @media (max-width: 700px) {
    .main_banner {
      width: 100%;
    }

    section {
      width: 100%;
      padding: 0;
      text-align: center;
      transform: none;

      .title_box {
        h2 {
          font-size: 25px;
        }
        span {
          margin: 0;
        }
        p {
          display: none;
        }
      }

      .logo_anim {
        display: none;
      }
    }

    .service_list {
      gap: 2%;

      li {
        width: 49%;

        .cont {
          span {
            top: -15px;
            padding: 4px 10px;
            font-size: 10px;
          }
        }
      }
    }
  }
`;

export default MainArea;