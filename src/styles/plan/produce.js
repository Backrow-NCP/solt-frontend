import styled from 'styled-components';

const PlanProduce = styled.div`
  position: relative;
  margin-bottom: -200px;

  // 플랜 영역
  .plan_cont {
    position: fixed;
    z-index: 1;
    top: 50%;
    left: 20px;
    width: 568px;
    padding: 40px 30px 40px 40px;
    background: #fff;
    border-radius: 32px;
    box-sizing: border-box;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-50%);
    transition: 0.3s ease;

    &.scroll {
      top: 38%;
    }

    > button {
      width: 100%;
      margin-top: 10px;

      &:first-of-type {
        margin-top: 40px;
      }
    }
  }

  // 지도 영역
  .gmnoprint {
    display: none;
  }
  .gm-style {
    font-family: 'Paperlogy', sans-serif !important;
  }
  .gm-style .gm-style-iw-c {
    width: 200px;
    padding: 15px 0px 5px 15px !important;
    text-align: center;
  }
  .gm-style .gm-style-iw-c strong {
    display: block;
    margin-bottom: 5px;
  }
  .gm-style .gm-style-iw-chr {
    position: absolute;
    top: 8px;
    right: 8px;
  }
  .gm-style .gm-style-iw-chr .gm-style-iw-c p {
    font-size: 11px;
  }
  .gm-style .gm-style-iw-chr button {
    width: 20px !important;
    height: 20px !important;
  }
  .gm-style .gm-style-iw-chr button span {
    width: 20px !important;
    height: 20px !important;
    margin: 0 !important;
  }
`;

export default PlanProduce;
